const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

// --- الإعدادات الأساسية ---
const TOKEN = '8130863824:AAEVg5aAWetfi79N5qC6CipWt7PVpo-yxJU';
const ADMIN_ID = 1002670694;
const STATUS_FILE = path.join(__dirname, 'bot_status.json');
const SUBS_FILE = path.join(__dirname, 'subscribers.json');
const LIMIT = 30; // تم تعديل الحد إلى 30 بناءً على طلبك

// تفعيل البوت باستخدام الـ Long Polling (لا يحتاج إلى Webhook)
const bot = new TelegramBot(TOKEN, { polling: true });

// نظام حماية الإغراق (Anti-Flood Cache)
const floodMap = new Map();
function isFlooding(userId) {
    if (userId === ADMIN_ID) return false;
    const now = Date.now();
    const lastTime = floodMap.get(userId) || 0;
    if ((now - lastTime) < 3000) { // يمنع الطلبات المتتالية أقل من 3 ثوانٍ
        return true;
    }
    floodMap.set(userId, now);
    return false;
}

// --- إدارة حالة البوت ---
function isBotActive() {
    if (!fs.existsSync(STATUS_FILE)) return true;
    try {
        const data = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
        return data.active !== undefined ? data.active : true;
    } catch (e) {
        return true;
    }
}

function setBotActive(status) {
    fs.writeFileSync(STATUS_FILE, JSON.stringify({ active: Boolean(status) }, null, 2));
}

// --- نظام الاشتراكات المدفوعة ---
function getSubscribers() {
    if (!fs.existsSync(SUBS_FILE)) return {};
    try {
        const data = JSON.parse(fs.readFileSync(SUBS_FILE, 'utf8'));
        return typeof data === 'object' && data !== null ? data : {};
    } catch (e) {
        return {};
    }
}

function saveSubscribers(subs) {
    fs.writeFileSync(SUBS_FILE, JSON.stringify(subs, null, 2));
}

function addSubscriber(userId, days) {
    const subs = getSubscribers();
    const now = Math.floor(Date.now() / 1000);
    const seconds = days * 86400;
    if (subs[userId] && subs[userId] > now) {
        subs[userId] += seconds; // تمديد الاشتراك
    } else {
        subs[userId] = now + seconds; // اشتراك جديد
    }
    saveSubscribers(subs);
    return subs[userId];
}

function removeSubscriber(userId) {
    const subs = getSubscribers();
    if (subs[userId]) {
        delete subs[userId];
        saveSubscribers(subs);
        return true;
    }
    return false;
}

function isSubscribed(userId) {
    if (userId === ADMIN_ID) return true;
    const subs = getSubscribers();
    const now = Math.floor(Date.now() / 1000);
    return subs[userId] && subs[userId] > now;
}

// دالة مساعدة لإرسال الرسائل الطويلة (صفحة الروابط والقوائم) لتجنب حظر تليجرام
async function sendLongMessage(chatId, text) {
    const MAX_LENGTH = 4000;
    if (text.length <= MAX_LENGTH) {
        await bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
        return;
    }
    for (let i = 0; i < text.length; i += MAX_LENGTH) {
        await bot.sendMessage(chatId, text.substring(i, i + MAX_LENGTH), { parse_mode: 'Markdown' });
    }
}

// --- معالجة الرسائل الواردة ---
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const text = msg.text ? msg.text.trim() : '';

    if (!text) return;

    // فحص حماية الإغراق
    if (isFlooding(fromId)) {
        await bot.sendMessage(chatId, "⚠️ يرجى الانتظار قليلاً بين الطلبات لمنع الضغط على السيرفر.");
        return;
    }

    // --- أمر البدء /start ---
    if (text === '/start') {
        let msgText = '';
        if (fromId === ADMIN_ID) {
            msgText = "👑 **أهلاً بك يا أدمن!**\n\n" +
                      "🛠️ **لوحة التحكم بالاشتراكات:**\n" +
                      "• تفعيل مشترك: `/add [الآيدي] [الأيام]`\n" +
                      "• إلغاء مشترك: `/rem [الآيدي]`\n" +
                      "• قائمة المشتركين: `/list`\n" +
                      "• إيقاف البوت: `/off` | تشغيل: `/on`\n\n" +
                      "🔍 للبحث والسحب: أرسل الكلمة المفتاحية مباشرة.";
        } else {
            if (isSubscribed(fromId)) {
                const subs = getSubscribers();
                const expiry = new Date(subs[fromId] * 1000).toISOString().replace('T', ' ').substring(0, 16);
                msgText = `✅ **اشتراكك مفعل وسارٍ!**\n📅 تاريخ الانتهاء: \`${expiry}\`\n\nأرسل اسم المشروع أو اللغة للبحث والسحب فوراً.`;
            } else {
                msgText = "🔒 **هذا البوت مدفوع ومخصص للمشتركين فقط.**\n\n" +
                          `🆔 **معرّفك (ID):** \`${fromId}\`\n` +
                          "يرجى إرسال هذا الرقم للأدمن لتفعيل اشتراكك والسماح لك بالسحب.";
            }
        }
        await bot.sendMessage(chatId, msgText, { parse_mode: 'Markdown' });
        return;
    }

    // --- أوامر الأدمن ---
    if (fromId === ADMIN_ID) {
        if (text === '/off') {
            setBotActive(false);
            await bot.sendMessage(chatId, "⛔ تم إيقاف عمل البوت.");
            return;
        }

        if (text === '/on') {
            setBotActive(true);
            await bot.sendMessage(chatId, "✅ تم تشغيل البوت.");
            return;
        }

        if (text.startsWith('/add')) {
            const parts = text.split(' ');
            if (parts.length >= 3 && !isNaN(parts[1]) && !isNaN(parts[2])) {
                const targetId = parseInt(parts[1]);
                const days = parseInt(parts[2]);
                const expireTime = addSubscriber(targetId, days);
                const expireDate = new Date(expireTime * 1000).toISOString().replace('T', ' ').substring(0, 16);

                await bot.sendMessage(chatId, `✅ **تم الاشتراك بنجاح!**\n\n👤 المستخدم: \`${targetId}\`\n⏳ المدة: \`${days}\` يوم\n📅 ينتهي في: \`${expireDate}\``, { parse_mode: 'Markdown' });
                await bot.sendMessage(targetId, `🎉 **تم تفعيل اشتراكك في البوت بنجاح!**\n\n⏳ المدة: \`${days}\` يوم\n📅 الانتهاء: \`${expireDate}\``, { parse_mode: 'Markdown' }).catch(() => {});
            } else {
                await bot.sendMessage(chatId, "❌ **صيغة غير صحيحة.**\nالاستخدام: `/add [الآيدي] [عدد_الأيام]`", { parse_mode: 'Markdown' });
            }
            return;
        }

        if (text.startsWith('/rem')) {
            const parts = text.split(' ');
            if (parts.length >= 2 && !isNaN(parts[1])) {
                const targetId = parseInt(parts[1]);
                if (removeSubscriber(targetId)) {
                    await bot.sendMessage(chatId, `🗑️ تم إلغاء اشتراك المستخدم: \`${targetId}\``, { parse_mode: 'Markdown' });
                } else {
                    await bot.sendMessage(chatId, "❌ هذا المستخدم غير موجود.");
                }
            } else {
                await bot.sendMessage(chatId, "❌ الصيغة الصحيحة: `/rem [الآيدي]`", { parse_mode: 'Markdown' });
            }
            return;
        }

        if (text === '/list') {
            const subs = getSubscribers();
            if (Object.keys(subs).length === 0) {
                await bot.sendMessage(chatId, "لا يوجد مشتركون حالياً.");
            } else {
                let listMsg = "📋 **قائمة المشتركين الحاليين:**\n\n";
                const now = Math.floor(Date.now() / 1000);
                for (const [uid, exp] of Object.entries(subs)) {
                    const status = exp > now ? `🟢 نشط (ينتهي: ${new Date(exp * 1000).toISOString().replace('T', ' ').substring(0, 16)})` : "🔴 منتهي";
                    listMsg += `• \`${uid}\` 👈 ${status}\n`;
                }
                await sendLongMessage(chatId, listMsg);
            }
            return;
        }
    }

    // --- التحقق من حالة البوت والترخيص للبحث ---
    if (!isBotActive()) {
        await bot.sendMessage(chatId, "البوت متوقف حاليًا عن العمل.");
        return;
    }

    if (!isSubscribed(fromId)) {
        await bot.sendMessage(chatId, `🚫 **عذراً، لا يمكنك استخدام البوت والسحب.**\n\nالبوت متاح للمشتركين فقط.\n🆔 معرّفك: \`${fromId}\`\nيرجى مراسلة الأدمن للتفعيل.`, { parse_mode: 'Markdown' });
        return;
    }

    // --- تنفيذ البحث والسحب من GitHub ---
    if (text.length > 80) {
        await bot.sendMessage(chatId, "⚠️ نص البحث طويل جداً، يرجى اختصاره.");
        return;
    }

    await bot.sendMessage(chatId, `🔍 جاري البحث في GitHub وجلب أول ${LIMIT} مشاريع مع الروابط والملفات...`);

    try {
        const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(text)}&sort=stars&order=desc&per_page=${LIMIT}`;
        const response = await axios.get(searchUrl, {
            headers: { 'User-Agent': 'TelegramBot-Aehabbb/1.0' },
            timeout: 25000
        });

        const projects = response.data.items || [];
        if (projects.length === 0) {
            await bot.sendMessage(chatId, "لم يتم العثور على أي مشاريع تطابق هذا البحث.");
            return;
        }

        // إنشاء وتنسيق صفحة الروابط وقائمة المشاريع المضبوطة
        let messageMs = `🎯 **تم العثور على ${projects.length} مشروعًا (صفحة الروابط):**\n\n`;
        projects.forEach((project, index) => {
            const num = index + 1;
            const nameHeroes = project.name; // تم تصحيح اسم المتغير هنا
            const urlPro = project.html_url;
            messageMs += `${num}. **${nameHeroes}**\n🔗 ${urlPro}\n---------------------------------------\n`;
        });

        // إرسال صفحة الروابط للعميل
        await sendLongMessage(chatId, messageMs);

        // تنزيل وإرسال جميع الملفات المضغوطة للمشاريع بكفاءة ودعم فروع متعددة
        for (const project of projects) {
            const cleanName = project.name.replace(/[^a-zA-Z0-9_\-]/g, '_');
            const urlPro = project.html_url;
            const branches = [...new Set([project.default_branch, 'main', 'master'])].filter(Boolean);

            const tempFile = path.join(os.tmpdir(), `${cleanName}_${Date.now()}_${Math.floor(Math.random() * 900 + 100)}.zip`);
            let downloaded = false;

            for (const branch of branches) {
                try {
                    const zipUrl = `${urlPro}/archive/refs/heads/${branch}.zip`;
                    const writer = fs.createWriteStream(tempFile);
                    const zipResponse = await axios({
                        url: zipUrl,
                        method: 'GET',
                        responseType: 'stream',
                        timeout: 120000,
                        headers: { 'User-Agent': 'TelegramBot-Aehabbb/1.0' }
                    });

                    zipResponse.data.pipe(writer);

                    await new Promise((resolve, reject) => {
                        writer.on('finish', resolve);
                        writer.on('error', reject);
                    });

                    if (fs.existsSync(tempFile) && fs.statSync(tempFile).size > 0) {
                        downloaded = true;
                        break;
                    }
                } catch (err) {
                    if (fs.existsSync(tempFile)) {
                        fs.unlinkSync(tempFile);
                    }
                }
            }

            if (downloaded && fs.existsSync(tempFile) && fs.statSync(tempFile).size > 0) {
                try {
                    await bot.sendDocument(chatId, tempFile, {
                        caption: `📦 **مشروع:** ${cleanName}\n\n🔗 ${urlPro}`,
                        parse_mode: 'Markdown'
                    });
                } catch (docErr) {
                    // تجاهل الخطأ في حال تعذر إرسال ملف فردي
                }
            }

            if (fs.existsSync(tempFile)) {
                fs.unlinkSync(tempFile);
            }
        }

    } catch (error) {
        await bot.sendMessage(chatId, "حدث خطأ أثناء الاتصال بمزود GitHub.");
    }
});

console.log("🤖 Telegram Bot is running successfully with Long Polling...");

