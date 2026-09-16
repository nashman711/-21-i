const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_KEY = "8956437602:AAHVyOJUal--tjmYy42EKJtLxrfQcNS0Tpk";
const admin = ["1002670694"];
const me = "-1004399661037";
const ehabme = "-1004381639694";
const ehab_me = "-1002370397883";
const ehabeeeeee = "-1002413586577";
const ehab_12 = "https://t.me/Y_20_20";
const ehab_link = "https://t.me/ehabsms7";
const jiminot = "𝗘𝗛𝗔𝗕𝗔𝗜𝗛𝗔𝗪𝗕𝗔𝗡𝗜";

if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

const storage_file = path.join('data', 'storage.json');
const users_file = path.join('data', 'users.json');
const send_file = path.join('data', 'send.json');
const channels_file = path.join('data', 'channels.json');
const banned_file = path.join('data', 'banned.json');

function get_storage() {
    if (!fs.existsSync(storage_file)) {
        const def = {
            'countries': [],
            'smsbower_api': '',
            'apifastpva': '',
            'app': 'wa',
            'last_auto_broadcast': 0,
            'app_rotation_index': 0,
            'stop_availability': false,
            'maintenance': false,
            'maintenance_msg': '⚠️ البوت متوقف حالياً للصيانة والتحديث الدوري. يرجى المحاولة لاحقاً.'
        };
        fs.writeFileSync(storage_file, JSON.stringify(def, null, 2), 'utf8');
        return def;
    }
    try {
        const data = JSON.parse(fs.readFileSync(storage_file, 'utf8'));
        return typeof data === 'object' && data !== null ? data : {};
    } catch (e) {
        return {};
    }
}

function save_storage(data) {
    fs.writeFileSync(storage_file, JSON.stringify(data, null, 2), 'utf8');
}

function get_users() {
    if (!fs.existsSync(users_file)) {
        fs.writeFileSync(users_file, JSON.stringify({}, null, 2), 'utf8');
        return {};
    }
    try {
        const data = JSON.parse(fs.readFileSync(users_file, 'utf8'));
        return typeof data === 'object' && data !== null ? data : {};
    } catch (e) {
        return {};
    }
}

function save_users(array) {
    fs.writeFileSync(users_file, JSON.stringify(array, null, 2), 'utf8');
}

function get_send() {
    if (!fs.existsSync(send_file)) {
        fs.writeFileSync(send_file, JSON.stringify({}, null, 2), 'utf8');
        return {};
    }
    try {
        const data = JSON.parse(fs.readFileSync(send_file, 'utf8'));
        return typeof data === 'object' && data !== null ? data : {};
    } catch (e) {
        return {};
    }
}

function sends(array) {
    fs.writeFileSync(send_file, JSON.stringify(array, null, 2), 'utf8');
}

function get_channels_and_admins() {
    if (!fs.existsSync(channels_file)) {
        const def = {
            'channels': [],
            'admins': admin
        };
        fs.writeFileSync(channels_file, JSON.stringify(def, null, 2), 'utf8');
        return def;
    }
    try {
        const data = JSON.parse(fs.readFileSync(channels_file, 'utf8'));
        if (!data.admins || !Array.isArray(data.admins) || data.admins.length === 0) data.admins = admin;
        if (!data.channels) data.channels = [];
        return data;
    } catch (e) {
        return { 'channels': [], 'admins': admin };
    }
}

function save_channels_and_admins(data) {
    fs.writeFileSync(channels_file, JSON.stringify(data, null, 2), 'utf8');
}

function get_banned() {
    if (!fs.existsSync(banned_file)) {
        fs.writeFileSync(banned_file, JSON.stringify([], null, 2), 'utf8');
        return [];
    }
    try {
        const data = JSON.parse(fs.readFileSync(banned_file, 'utf8'));
        return Array.isArray(data) ? data : [];
    } catch (e) {
        return [];
    }
}

function save_banned(array) {
    const unique = [...new Set(array)];
    fs.writeFileSync(banned_file, JSON.stringify(unique, null, 2), 'utf8');
}

function getBaghdadDateInfo() {
    const now = new Date();
    const formatterTime = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Baghdad', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const parts = formatterTime.formatToParts(now);
    let h = '01', m = '00', s = '00', a = 'AM';
    for (let p of parts) {
        if (p.type === 'hour') h = p.value;
        if (p.type === 'minute') m = p.value;
        if (p.type === 'second') s = p.value;
        if (p.type === 'dayPeriod') a = p.value.toUpperCase();
    }
    const tim1 = `${h}:${m}:${s}`;
    const a_str = a === 'AM' ? 'AM' : 'PM';
    const e_str = a === 'AM' ? 'صباحاً' : 'مسائاً';

    const formatterDate = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Baghdad', year: 'numeric', month: '2-digit', day: '2-digit' });
    const dateParts = formatterDate.formatToParts(now);
    let Y = '2026', M = '06', D = '16';
    for (let p of dateParts) {
        if (p.type === 'year') Y = p.value;
        if (p.type === 'month') M = p.value;
        if (p.type === 'day') D = p.value;
    }

    const weekdays = ['الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const wIndex = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Baghdad' })).getDay();
    const DY = weekdays[wIndex] || 'الأحد';

    const months = ['فارغ', 'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
    const MH = months[parseInt(M, 10)] || 'يناير';

    const DAY2 = `${DY} ${D} ${MH} ${Y} | ${tim1} ${e_str}`;
    const DAY3 = `${D}-${M}-${Y} | ${tim1} ${e_str}`;

    return { DAY2, DAY3 };
}

async function bot(method, datas = {}) {
    const url = `https://api.telegram.org/bot${API_KEY}/${method}`;
    try {
        const response = await axios.post(url, datas, { timeout: 5000 });
        return response.data;
    } catch (error) {
        return null;
    }
}

async function smsbower_req(action, params = {}) {
    const st = get_storage();
    let apiKey = (st.smsbower_api || '').trim();
    if (!apiKey) {
        apiKey = (st.apifastpva || '').trim();
    }
    if (!apiKey) return "NO_API_KEY";

    let baseUrl = `https://smsbower.app/stubs/handler_api.php?api_key=${apiKey}&action=${action}`;
    for (const [key, val] of Object.entries(params)) {
        baseUrl += `&${key}=${encodeURIComponent(val)}`;
    }

    try {
        const response = await axios.get(baseUrl, { timeout: 5000 });
        return typeof response.data === 'string' ? response.data.trim() : String(response.data).trim();
    } catch (e) {
        return "";
    }
}

const _co_country = {
    0: "روسيا 🇷🇺", 1: "أوكرانيا 🇺🇦", 2: "كازاخستان 🇰🇿", 4: "الفلبين 🇵🇭", 5: "ميانمار 🇲🇲",
    6: "إندونيسيا 🇮🇩", 7: "ماليزيا 🇲🇾", 8: "كينيا 🇰🇪", 9: "تنزانيا 🇹🇿", 10: "فيتنام 🇻🇳",
    11: "قيرغيزستان 🇰🇬", 13: "إسرائيل 🇮🇱👞", 14: "هونغ كونغ 🇭🇰", 15: "بولندا 🇵🇱", 16: "🇬🇧 بريطانيا",
    17: "مدغشقر 🇲🇬", 18: "ديم الكونغو 🇨🇩", 19: "نيجيريا 🇳🇬", 20: "ماكاو 🇲🇴", 21: "مصر 🇪🇬",
    22: "الهند 🇮🇳", 23: "أيرلندا 🇮🇪", 24: "كمبوديا 🇰🇭", 25: "لاوس 🇱🇦", 26: "هايتي 🇭🇹",
    28: "غامبيا 🇬🇲", 30: "اليمن 🇾🇪", 31: "جنوب إفريقيا 🇿🇦", 32: "رومانيا 🇷🇴", 33: "كولومبيا 🇨🇴",
    34: "إستونيا 🇪🇪", 35: "أذربيجان 🇦🇿", 36: "كندا 🇨🇦", 37: "المغرب 🇲🇦", 38: "غانا 🇬🇭",
    39: "الأرجنتين 🇦🇷", 40: "أوزبكستان 🇺🇿", 41: "الكاميرون 🇨🇲", 42: "تشاد 🇹🇩", 43: "المانيا 🇩🇪",
    44: "ليتوانيا 🇱🇹", 46: "السويد 🇸🇪", 47: "العراق 🇮🇶", 48: "هولندا 🇳🇱", 49: "لاتيفيا 🇱🇻",
    50: "النمسا 🇦🇹", 51: "بيلاروسيا 🇧🇾", 52: "تايلاند 🇹🇭", 53: "السعودية 🇸🇦", 54: "المكسيك 🇲🇽",
    55: "تايوان 🇹🇼", 56: "اسبانيا 🇪🇸", 57: "إيران 🇮🇷", 58: "الجزائر 🇩🇿", 59: "سلوفينيا 🇸🇮",
    60: "بنغلاديش 🇧🇩", 61: "السنغال 🇸🇳", 62: "تركيا 🇹🇷", 63: "التشيك 🇨🇿", 64: "سريلانكا 🇱🇰",
    65: "بيرو 🇵🇪", 66: "باكستان 🇵🇰", 67: "نيوزيلندا 🇳🇿", 68: "غينيا 🇬🇳", 69: "مالي 🇲🇱",
    70: "فنزويلا 🇻🇪", 71: "إثيوبيا 🇪🇹", 72: "منغوليا 🇲🇳", 73: "البرازيل 🇧🇷", 74: "أفغانستان 🇦🇫",
    75: "أوغندا 🇺🇬", 76: "أنغولا 🇦🇴", 77: "قبرص 🇨🇾", 78: "فرنسا 🇫🇷", 79: "بابو 🇵🇬",
    80: "موزمبيق 🇲🇿", 81: "نيبال 🇳🇵", 82: "بلجيكا 🇧🇪", 83: "بلغاريا 🇧🇬", 84: "هنغاريا 🇭🇺",
    85: "مولدوفا 🇲🇩", 86: "إيطاليا 🇮🇹", 87: "باراغواي 🇵🇾", 88: "هندوراس 🇭🇳", 89: "تونس 🇹🇳",
    90: "نيكاراغوا 🇳🇮", 92: "بوليفيا 🇧🇴", 93: "كوستاريكا 🇨🇷", 94: "غواتيمالا 🇬🇹", 95: "الإمارات 🇦🇪",
    96: "زيمبابوي 🇿🇼", 97: "بورتوريكو 🇵🇷", 98: "السودان 🇸🇩", 99: "توجو 🇹🇬", 100: "الكويت 🇰🇼",
    101: "سلفادور 🇸🇻", 102: "ليبيا 🇱🇾", 103: "جامايكا 🇯🇲", 104: "ترينيداد 🇹🇹", 105: "الاكوادور 🇪🇨",
    106: "سوازيلاند 🇸🇿", 107: "عمان 🇴🇲", 109: "الدومينيكان 🇩🇴", 110: "سوريا 🇸🇾", 111: "قطر 🇶🇦",
    112: "بنما 🇵🇦", 113: "كوبا 🇨🇺", 115: "سيراليون 🇸🇱", 116: "الأردن 🇯🇴", 117: "البرتغال 🇵🇹",
    118: "بربادوس 🇧🇧", 119: "بوروندي 🇧🇮", 120: "بنين 🇧🇯", 121: "بروناي 🇧🇳", 122: "جزر البهاما 🇧🇸",
    123: "بوتسوانا 🇧🇼", 124: "بليز 🇧🇿", 125: "إفريقيا الوسطى 🇨🇫", 127: "غرينادا 🇬🇩", 128: "جورجيا 🇬🇪",
    129: "اليونان 🇬🇷", 130: "غينيا بيساو 🇬🇼", 131: "غيانا 🇬🇾", 132: "أيسلندا 🇮🇸", 135: "ليبيريا 🇱🇷",
    136: "ليسوتو 🇱🇸", 137: "ملاوي 🇲🇼", 138: "ناميبيا 🇳🇦", 139: "النيجر 🇳🇪", 141: "سلوفاكيا 🇸🇰",
    142: "سورينام 🇸🇷", 143: "طاجيكستان 🇹🇯", 144: "موناكو 🇲🇨", 145: "البحرين 🇧🇭", 147: "زامبيا 🇿🇲",
    148: "أرمينيا 🇦🇲", 149: "الصومال 🇸🇴", 150: "الكونغو 🇨🇬", 151: "تشيلي 🇨🇱", 152: "بوركينا فاسو 🇧🇫",
    153: "لبنان 🇱🇧", 154: "الغابون 🇬🇦", 155: "ألبانيا 🇦🇱", 156: "اوروغواي 🇺🇾", 157: "موريشيوس 🇲🇺",
    159: "المالديف 🇲🇻", 161: "تركمانستان 🇹🇲", 163: "فنلندا 🇫🇮", 162: "غويانا الفرنسية 🇬🇫", 164: "لوسيا 🇱🇨",
    165: "لوكسمبورغ 🇱🇺", 166: "جزر غرينادين 🇻🇨", 168: "جيبوتي 🇩🇯", 169: "أنتيجواباربودا 🇦🇬", 172: "الدنمارك 🇩🇰",
    173: "سويسرا 🇨🇭", 174: "النرويج 🇳🇴", 175: "استراليا 🇦🇺", 178: "برينسيبي 🇸🇹", 180: "مونتسيرات 🇲🇸",
    181: "أنغويلا 🇦🇮", 183: "مقدونيا 🇲🇰", 184: "سيشيل 🇸🇨", 187: "أمريكا 🇺🇸", 189: "فيجي 🇫🇯",
    193: "جزر سليمان 🇸🇧", 195: "برمودا 🇧🇲", 196: "الصحراء الغربية 🇪🇭", 197: "تونغا 🇹🇴", 199: "مالطا 🇲🇹", 200: "عشوائي 🌐"
};

const _co_o_country = {
    0: "+7", 1: "+380", 2: "+7", 4: "+63", 5: "+95", 6: "+62", 7: "+60", 8: "+254", 9: "+255", 10: "+84",
    11: "+996", 13: "+972", 14: "+852", 15: "+48", 16: "+44", 17: "+261", 18: "+243", 19: "+234", 20: "+853", 21: "+20",
    22: "+91", 23: "+353", 24: "+855", 25: "+856", 26: "+509", 28: "+220", 30: "+967", 31: "+27", 32: "+40", 33: "+57",
    34: "+372", 35: "+994", 36: "+1", 37: "+212", 38: "+233", 39: "+54", 40: "+998", 41: "+237", 42: "+235", 43: "+49",
    44: "+370", 46: "+46", 47: "+964", 48: "+31", 49: "+371", 50: "+43", 51: "+375", 52: "+66", 53: "+966", 54: "+52",
    55: "+886", 56: "+34", 57: "+98", 58: "+213", 59: "+386", 60: "+880", 61: "+221", 62: "+90", 63: "+420", 64: "+94",
    65: "+51", 66: "+92", 67: "+64", 68: "+224", 69: "+223", 70: "+58", 71: "+251", 72: "+976", 73: "+55", 74: "+93",
    75: "+256", 76: "+244", 77: "+357", 78: "+33", 79: "+675", 80: "+258", 81: "+977", 82: "+32", 83: "+359", 84: "+36",
    85: "+373", 86: "+39", 87: "+595", 88: "+504", 89: "+216", 90: "+505", 92: "+591", 93: "+506", 94: "+502", 95: "+971",
    96: "+263", 97: "+1", 98: "+249", 99: "+228", 100: "+965", 101: "+503", 102: "+218", 103: "+1", 104: "+1", 105: "+593",
    106: "+268", 107: "+968", 109: "+1", 110: "+963", 111: "+974", 112: "+507", 113: "+53", 115: "+232", 116: "+962", 117: "+351",
    118: "+1", 119: "+257", 120: "+229", 121: "+673", 122: "+1", 123: "+267", 124: "+501", 125: "+236", 127: "+1", 128: "+995",
    129: "+30", 130: "+245", 131: "+592", 132: "+354", 135: "+231", 136: "+266", 137: "+265", 138: "+264", 139: "+227", 141: "+421",
    142: "+597", 143: "+992", 144: "+377", 145: "+973", 147: "+260", 148: "+374", 149: "+252", 150: "+242", 151: "+56", 152: "+226",
    153: "+961", 154: "+241", 155: "+355", 156: "+598", 157: "+230", 159: "+960", 161: "+993", 163: "+358", 162: "+594", 164: "+1",
    165: "+352", 166: "+1", 168: "+253", 169: "+1", 172: "+45", 173: "+41", 174: "+47", 175: "+61", 178: "+239", 180: "+1",
    181: "+1", 183: "+389", 184: "+248", 187: "+1", 189: "+679", 193: "+677", 195: "+1", 196: "+212", 197: "+676", 199: "+356", 200: ""
};

const arab_indices = [21, 30, 37, 47, 53, 58, 89, 95, 98, 100, 102, 107, 110, 111, 116, 145, 149, 153, 168];
const europe_indices = [0, 1, 15, 16, 23, 32, 34, 43, 44, 46, 48, 49, 50, 51, 56, 59, 62, 63, 77, 78, 82, 83, 84, 85, 86, 117, 128, 129, 132, 141, 144, 155, 163, 165, 172, 173, 174, 183, 199];
const africa_indices = [8, 9, 17, 18, 19, 28, 31, 38, 41, 42, 61, 68, 69, 71, 75, 76, 80, 96, 99, 106, 115, 119, 120, 123, 125, 130, 135, 136, 137, 138, 139, 147, 150, 152, 154, 157, 178, 184, 196];
const asia_indices = [2, 4, 5, 6, 7, 10, 11, 13, 14, 20, 22, 24, 25, 35, 40, 52, 55, 57, 60, 64, 66, 72, 74, 81, 121, 143, 148, 159, 161];
const foreign_indices = [26, 33, 36, 39, 54, 65, 67, 70, 73, 79, 87, 88, 90, 92, 93, 94, 97, 101, 103, 104, 105, 109, 112, 113, 118, 122, 124, 127, 131, 142, 151, 156, 162, 164, 166, 169, 175, 180, 181, 187, 189, 193, 195, 197, 200];

app.post('/', async (req, res) => {
    res.sendStatus(200);

    const update = req.body;
    if (!update) return;

    try {
        await bot("setMyCommands", {
            "commands": JSON.stringify([
                { "command": "start", "description": "القائمة الرئيسية 🏡" },
                { "command": "admin", "description": "لوحة التحكم ⚙️" }
            ])
        });

        let message = update.message || null;
        let chat_id = message ? message.chat.id : null;
        let text = message ? message.text : null;
        let message_id = message ? message.message_id : null;
        let id = message ? message.from.id : null;
        let user = message ? message.from.username : null;
        let first = message ? message.from.first_name : null;

        if (update.callback_query) {
            chat_id = update.callback_query.message.chat.id;
            message_id = update.callback_query.message.message_id;
            var data = update.callback_query.data;
            user = update.callback_query.from.username || null;
            first = update.callback_query.from.first_name || null;
            id = update.callback_query.from.id;
        }

        let user_mention = user == null ? "لايوجد ❌" : `[@${user}]`;

        const bot_info_general = await bot('getMe');
        const bot_username_general = bot_info_general && bot_info_general.result ? bot_info_general.result.username || '' : '';
        const bot_link_general = bot_username_general ? `https://t.me/${bot_username_general}` : "https://t.me/";

        const banned_list = get_banned();
        const ch_data = get_channels_and_admins();
        const admins_list = ch_data.admins || admin;
        const forced_channels = ch_data.channels || [];

        // الحماية القوية ضد الحظر والمستخدمين المحظورين
        if (id && banned_list.includes(String(id)) && !admins_list.includes(String(id))) {
            if (update.callback_query) {
                await bot('answerCallbackQuery', {
                    'callback_query_id': update.callback_query.id,
                    'text': "🚫 عذراً، تم حظرك من استخدام البوت من قبل إدارة البوت.",
                    'show_alert': true
                });
            } else {
                await bot('sendMessage', {
                    'chat_id': id,
                    'text': "🚫 **عذراً، تم حظرك من استخدام البوت.**\n\nإذا كنت تعتقد أن هذا حدث عن طريق الخطأ، يرجى التواصل مع الدعم الفني.",
                    'parse_mode': "MarkDown"
                });
            }
            return;
        }

        const users = get_users();
        const date_info = getBaghdadDateInfo();
        const DAY2 = date_info.DAY2;
        const DAY3 = date_info.DAY3;

        if (id && !users[id]) {
            users[id] = {
                'balance': 0,
                'username': user,
                'first_name': first,
                'date': new Date().toISOString()
            };
            save_users(users);

            if (ehab_me) {
                await bot('sendMessage', {
                    'chat_id': ehab_me,
                    'text': `
➖ تم دخول شخص جديد الى البوت 👤•
➖ إسم الشخص: [${first}](tg://user?id=${id}) 📝.•
➖ الحاله : تم التحقق وليس روبوت ✅️ •
➖ ايديه : \`${id}\` 🆔️•
➖ معرف حسابه : ${user_mention} 📮•
        🔰
➖➖➖➖➖➖
📆 - ${DAY2}`,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [
                                { 'text': "👤 كشف العضو", 'url': `tg://user?id=${id}` },
                                { 'text': "🔙 العودة إلى البوت", 'url': bot_link_general }
                            ]
                        ]
                    })
                });
            }
        }

        const storage_m = get_storage();
        if (storage_m.maintenance && id && !admins_list.includes(String(id))) {
            const m_alert = storage_m.maintenance_msg || "⚠️ **البوت متوقف حالياً للصيانة والتحديث الدوري.\n\nيرجى المحاولة لاحقاً.**";
            await bot('sendMessage', {
                'chat_id': id,
                'text': m_alert,
                'parse_mode': "MarkDown"
            });
            return;
        }

        // الإذاعة التلقائية للعروض
        const last_broadcast = storage_m.last_auto_broadcast || 0;
        const is_availability_stopped = storage_m.stop_availability || false;
        if (!is_availability_stopped && (Math.floor(Date.now() / 1000) - last_broadcast) >= 5 && me) {
            const apps_to_check = ['wa', 'tg'];
            const current_app_index = (storage_m.app_rotation_index || 0) % apps_to_check.length;
            const service_app = apps_to_check[current_app_index];

            storage_m.last_auto_broadcast = Math.floor(Date.now() / 1000);
            storage_m.app_rotation_index = current_app_index + 1;
            save_storage(storage_m);

            const app_names_arabic = {
                'wa': 'تطبيق واتساب 🟢 (WhatsApp)',
                'tg': 'تطبيق تيليجرام ✈️ (Telegram)'
            };
            const app_readable_name = app_names_arabic[service_app] || service_app;

            const res_prices_auto = await smsbower_req("getPrices", { 'service': service_app });
            try {
                const prices_auto_data = JSON.parse(res_prices_auto);
                if (prices_auto_data && typeof prices_auto_data === 'object') {
                    let active_offers = [];
                    for (const [c_id, c_name] of Object.entries(_co_country)) {
                        if (prices_auto_data[c_id] && typeof prices_auto_data[c_id] === 'object') {
                            const c_offers = prices_auto_data[c_id];
                            const app_offers = c_offers[service_app] || Object.values(c_offers)[0];
                            if (app_offers && typeof app_offers === 'object') {
                                let cost = 0, count = 0;
                                for (const [k, v] of Object.entries(app_offers)) {
                                    if (k === 'count') count = parseInt(v) || 0;
                                    else cost = parseFloat(v) || 0;
                                }
                                if (count > 0 || cost > 0) {
                                    active_offers.push({ 'name': c_name, 'cost': cost, 'count': count });
                                }
                            }
                        }
                    }

                    if (active_offers.length > 0) {
                        active_offers.sort(() => Math.random() - 0.5);
                        let channel_msg = `🔥 **عروض التوفير والأرقام المتاحة المتغيرة لـ ${app_readable_name}:**\n\n`;
                        const top_list = active_offers.slice(0, 20);
                        for (const item of top_list) {
                            channel_msg += `🏳️ ${item.name} | التكلفة: ${item.cost}$ \n`;
                        }
                        channel_msg += `\n⚡️ اطلب رقمك الآن عبر البوت الرسمي!\n📆 - ${DAY2}`;

                        const bot_info = await bot('getMe');
                        const bot_username = bot_info && bot_info.result ? bot_info.result.username || '' : '';
                        const bot_link = bot_username ? `https://t.me/${bot_username}` : "https://t.me/";

                        await bot("sendMessage", {
                            'chat_id': me,
                            'text': channel_msg,
                            'parse_mode': "MarkDown",
                            'reply_markup': JSON.stringify({
                                'inline_keyboard': [
                                    [{ 'text': "🔙 العودة للقناه", 'url': ehab_link }],
                                    [{ 'text': "🛒 شراء رقم جديد", 'url': bot_link }]
                                ]
                            })
                        });
                    }
                }
            } catch (e) {}
        }

        // نظام الاشتراك الإجباري
        if (id && !admins_list.includes(String(id)) && forced_channels.length > 0) {
            let not_subscribed = false;
            let ch_keyboard = { 'inline_keyboard': [] };
            for (const ch_username of forced_channels) {
                const res_member = await bot('getChatMember', {
                    'chat_id': ch_username,
                    'user_id': id
                });
                const status = res_member && res_member.result ? res_member.result.status : '';
                if (!res_member || res_member.ok !== true || ['left', 'kicked', 'restricted'].includes(status)) {
                    not_subscribed = true;
                    ch_keyboard.inline_keyboard.push([{ 'text': "📢 اشتراك في القناة", 'url': `https://t.me/${ch_username.replace('@', '')}` }]);
                }
            }
            if (not_subscribed) {
                ch_keyboard.inline_keyboard.push([{ 'text': "✅ تحقق من الاشتراك", 'callback_data': "user_home" }]);
                await bot('sendMessage', {
                    'chat_id': id,
                    'text': "⚠️ **عذراً، يجب عليك الاشتراك في قنوات البوت أولاً لتتمكن من استخدامه.**\n\nاشترك في القنوات أدناه ثم اضغط على زر التحقق 👇",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify(ch_keyboard)
                });
                return;
            }
        }

        let send = get_send();
        if (!send.user_step) send.user_step = {};

        if (id) {
            if (text === "/start" || (data && data === "user_home")) {
                const u_bal = users[id] ? users[id].balance || 0 : 0;
                const consumers = "₽";

                const keyboard = [
                    [{ 'text': "• ✳️ ارقام  واتسأب 🔹 •", 'callback_data': "set_app_wa" }, { 'text': "• 💹 ارقام تيليجرام 🔸 •", 'callback_data': "set_app_tg" }],
                    [{ 'text': "• 🎥 ارقام إنستقرام 🔹 •", 'callback_data': "set_app_ig" }, { 'text': "• 📮 ارقام فيسبوك 🔸 •", 'callback_data': "set_app_fb" }],
                    [{ 'text': "• 🚀 ارقام يويتر 🔹 •", 'callback_data': "set_app_tw" }, { 'text': "• 🔮 ارقام فايبــر 🔸 •", 'callback_data': "set_app_vi" }],
                    [{ 'text': "• 🧲 ارقام  تيكتوك. 🔹 •", 'callback_data': "set_app_tk" }, { 'text': "• 💎 ارقام  جوجل 🔸 •", 'callback_data': "set_app_go" }],
                    [{ 'text': "• 📩 ارقام سناب 🔹 •", 'callback_data': "set_app_sn" }, { 'text': "• 🔰 ارقام حراج  🔸 •", 'callback_data': "set_app_ha" }],
                    [{ 'text': "• 📭  ارقام إيمو  🔹 •", 'callback_data': "set_app_im" }, { 'text': "• 🕎  سيرفر العـام 🔸 •", 'callback_data': "social_offers_menu" }],
                    [{ 'text': "•🔹 عروض القارات 🔸 •", 'callback_data': "continents_menu" }],
                    [{ 'text': "• 🛰 السيرفر اجنبي 🔹 •", 'callback_data': "foreign_countries" }, { 'text': "• 🎴 السيرفر عربي 🔸 •", 'callback_data': "arab_countries" }],
                    [{ 'text': "💸 تحويل رصيد", 'callback_data': "transfer_balance_start" }, { 'text': "📥 استلام رصيد", 'callback_data': "receive_balance_start" }],
                    [{ 'text': "💰 حسابي / الرصيد", 'callback_data': "my_account" }, { 'text': "📜 الشروط والتعليمات", 'callback_data': "instructions" }],
                    [{ 'text': "📨┇الدعم الفني .", 'url': ehab_12 }]
                ];

                if (admins_list.includes(String(id))) {
                    keyboard.push([{ 'text': "⚙️ لوحة الإدارة ⚙️", 'callback_data': "admin_home" }]);
                }

                const reply_markup = JSON.stringify({ 'inline_keyboard': keyboard });

                const msg_text_html = `<b>🙋‍♂️ - مرحبا بك عزيزي ︙ ${first}  </b>
▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱
<b>📺┇ايديك :<code>${chat_id}</code> •</b>
<b>⚙┇رصيدك :<tg-spoiler>${u_bal}</tg-spoiler>${consumers}</b>
<b>🕹┇العملة :<code>${consumers}</code></b>
▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱
                     <b>𓆩•|ـــــ(${jiminot})ـــــ|•𓆪

💻  - تحكم الان بضغط على الازرار بلاسفل ⬇️</b>
`;

                if (data && data === "user_home") {
                    await bot('EditMessageText', {
                        'chat_id': chat_id,
                        'message_id': message_id,
                        'text': msg_text_html,
                        'parse_mode': "html",
                        'reply_markup': reply_markup
                    });
                } else {
                    await bot('sendMessage', {
                        'chat_id': id,
                        'text': msg_text_html,
                        'parse_mode': "html",
                        'reply_markup': reply_markup
                    });
                }
                return;
            }

            if (text === "/admin" || (data && data === "admin_home")) {
                if (!admins_list.includes(String(id))) return;
                const admin_panel_text = "⚙️ **لوحة تحكم المشرف الرئيسي:**\n\nاختر القسم المطلوب من الأزرار أدناه:";
                const admin_keyboard = JSON.stringify({
                    'inline_keyboard': [
                        [{ 'text': "📊 إحصائيات البوت", 'callback_data': "admin_stats" }, { 'text': "👤 إدارة المستخدمين", 'callback_data': "admin_users" }],
                        [{ 'text': "🔑 ضبط API Key", 'callback_data': "admin_set_api" }, { 'text': "📢 إرسال إذاعة", 'callback_data': "admin_broadcast" }],
                        [{ 'text': "⚠️ تبديل وضع الصيانة", 'callback_data': "admin_toggle_maintenance" }, { 'text': "🚫 قائمة المحظورين", 'callback_data': "admin_banned_list" }],
                        [{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]
                    ]
                });
                if (data) {
                    await bot('EditMessageText', {
                        'chat_id': chat_id,
                        'message_id': message_id,
                        'text': admin_panel_text,
                        'parse_mode': "MarkDown",
                        'reply_markup': admin_keyboard
                    });
                } else {
                    await bot('sendMessage', {
                        'chat_id': chat_id,
                        'text': admin_panel_text,
                        'parse_mode': "MarkDown",
                        'reply_markup': admin_keyboard
                    });
                }
                return;
            }

            if (data && data === "admin_stats") {
                if (!admins_list.includes(String(id))) return;
                const u_count = Object.keys(users).length;
                const b_count = banned_list.length;
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': `📊 **إحصائيات البوت:**\n\n👥 عدد المستخدمين المسجلين: ${u_count}\n🚫 عدد المحظورين: ${b_count}\n🛠 حالة الصيانة: ${storage_m.maintenance ? 'مفعلة ⚠️' : 'معطلة ✅'}`,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [[{ 'text': "🔙 الرجوع للوحة التحكم", 'callback_data': "admin_home" }]]
                    })
                });
                return;
            }

            if (data && data === "admin_users") {
                if (!admins_list.includes(String(id))) return;
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "👤 **إدارة المستخدمين:**\n\nاختر الإجراء المطلوب:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [{ 'text': "➕ إضافة رصيد لمستخدم", 'callback_data': "admin_add_balance" }, { 'text': "➖ خصم رصيد من مستخدم", 'callback_data': "admin_sub_balance" }],
                            [{ 'text': "🚫 حظر مستخدم", 'callback_data': "admin_ban_user" }, { 'text': "✅ إلغاء حظر مستخدم", 'callback_data': "admin_unban_user" }],
                            [{ 'text': "🔙 الرجوع للوحة التحكم", 'callback_data': "admin_home" }]
                        ]
                    })
                });
                return;
            }

            if (data && data === "admin_add_balance") {
                if (!admins_list.includes(String(id))) return;
                send.user_step[id] = 'admin_waiting_add_balance_id';
                sends(send);
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "➕ **إضافة رصيد لمستخدم:**\n\nأرسل الآن آيدي (ID) المستخدم:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({ 'inline_keyboard': [[{ 'text': "🔙 إلغاء", 'callback_data': "admin_users" }]] })
                });
                return;
            }

            if (data && data === "admin_sub_balance") {
                if (!admins_list.includes(String(id))) return;
                send.user_step[id] = 'admin_waiting_sub_balance_id';
                sends(send);
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "➖ **خصم رصيد من مستخدم:**\n\nأرسل الآن آيدي (ID) المستخدم:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({ 'inline_keyboard': [[{ 'text': "🔙 إلغاء", 'callback_data': "admin_users" }]] })
                });
                return;
            }

            if (data && data === "admin_ban_user") {
                if (!admins_list.includes(String(id))) return;
                send.user_step[id] = 'admin_waiting_ban_id';
                sends(send);
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "🚫 **حظر مستخدم:**\n\nأرسل الآن آيدي (ID) المستخدم المراد حظره:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({ 'inline_keyboard': [[{ 'text': "🔙 إلغاء", 'callback_data': "admin_users" }]] })
                });
                return;
            }

            if (data && data === "admin_unban_user") {
                if (!admins_list.includes(String(id))) return;
                send.user_step[id] = 'admin_waiting_unban_id';
                sends(send);
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "✅ **إلغاء حظر مستخدم:**\n\nأرسل الآن آيدي (ID) المستخدم المراد إلغاء حظره:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({ 'inline_keyboard': [[{ 'text': "🔙 إلغاء", 'callback_data': "admin_users" }]] })
                });
                return;
            }

            if (data && data === "admin_set_api") {
                if (!admins_list.includes(String(id))) return;
                send.user_step[id] = 'admin_waiting_api_key';
                sends(send);
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': `🔑 **ضبط API Key الخاص بـ SMSBower:**\n\nAPI الحالي: \`${storage_m.smsbower_api || 'غير مسجل'}\`\n\nأرسل مفتاح API الجديد الآن:`,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({ 'inline_keyboard': [[{ 'text': "🔙 إلغاء", 'callback_data': "admin_home" }]] })
                });
                return;
            }

            if (data && data === "admin_broadcast") {
                if (!admins_list.includes(String(id))) return;
                send.user_step[id] = 'admin_waiting_broadcast_msg';
                sends(send);
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "📢 **إرسال إذاعة لجميع المستخدمين:**\n\nأرسل النص أو الرسالة التي تريد إذاعتها الآن:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({ 'inline_keyboard': [[{ 'text': "🔙 إلغاء", 'callback_data': "admin_home" }]] })
                });
                return;
            }

            if (data && data === "admin_toggle_maintenance") {
                if (!admins_list.includes(String(id))) return;
                storage_m.maintenance = !storage_m.maintenance;
                save_storage(storage_m);
                await bot('answerCallbackQuery', {
                    'callback_query_id': update.callback_query.id,
                    'text': `⚠️ تم تغيير وضع الصيانة إلى: ${storage_m.maintenance ? 'مفعلة' : 'معطلة'}`,
                    'show_alert': true
                });
                // Refresh admin panel
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': `⚙️ **لوحة تحكم المشرف الرئيسي:**\n\nوضع الصيانة الحالي: **${storage_m.maintenance ? 'مفعلة ⚠️' : 'معطلة ✅'}**`,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [{ 'text': "📊 إحصائيات البوت", 'callback_data': "admin_stats" }, { 'text': "👤 إدارة المستخدمين", 'callback_data': "admin_users" }],
                            [{ 'text': "🔑 ضبط API Key", 'callback_data': "admin_set_api" }, { 'text': "📢 إرسال إذاعة", 'callback_data': "admin_broadcast" }],
                            [{ 'text': "⚠️ تبديل وضع الصيانة", 'callback_data': "admin_toggle_maintenance" }, { 'text': "🚫 قائمة المحظورين", 'callback_data': "admin_banned_list" }],
                            [{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]
                        ]
                    })
                });
                return;
            }

            if (data && data === "admin_banned_list") {
                if (!admins_list.includes(String(id))) return;
                const b_list = get_banned();
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': `🚫 **قائمة المستخدمين المحظورين:**\n\n${b_list.length > 0 ? b_list.map(id => `• \`${id}\``).join('\n') : 'لا يوجد مستخدمين محظورين حالياً.'}`,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [[{ 'text': "🔙 الرجوع للوحة التحكم", 'callback_data': "admin_home" }]]
                    })
                });
                return;
            }

            // معالجة الخطوات الإدارية النصية (Admin steps text input)
            if (send.user_step[id] && admins_list.includes(String(id)) && text) {
                const current_step = send.user_step[id];

                if (current_step === 'admin_waiting_api_key') {
                    storage_m.smsbower_api = text.trim();
                    storage_m.apifastpva = text.trim();
                    save_storage(storage_m);
                    delete send.user_step[id];
                    sends(send);
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': "✅ **تم تحديث API Key بنجاح!**", 'parse_mode': 'MarkDown' });
                    return;
                }

                if (current_step === 'admin_waiting_broadcast_msg') {
                    delete send.user_step[id];
                    sends(send);
                    const all_users = Object.keys(users);
                    let success_count = 0;
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': `📢 جاري إرسال الإذاعة إلى ${all_users.length} مستخدم...`, 'parse_mode': 'MarkDown' });
                    for (const uid of all_users) {
                        try {
                            const res_send = await bot('sendMessage', { 'chat_id': uid, 'text': text, 'parse_mode': 'MarkDown' });
                            if (res_send && res_send.ok) success_count++;
                        } catch (e) {}
                    }
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': `✅ **تم إكمال الإذاعة بنجاح!**\nتمت بنجاح إلى: ${success_count} مستخدم.`, 'parse_mode': 'MarkDown' });
                    return;
                }

                if (current_step === 'admin_waiting_add_balance_id') {
                    const target_uid = text.trim();
                    if (!users[target_uid]) {
                        await bot('sendMessage', { 'chat_id': chat_id, 'text': "⚠️ المستخدم غير مسجل في البوت. أرسل آيدي صحيح:", 'parse_mode': 'MarkDown' });
                        return;
                    }
                    send.user_step[id] = `admin_waiting_add_balance_amount|${target_uid}`;
                    sends(send);
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': "💵 أرسل الآن المبلغ المراد إضافته:", 'parse_mode': 'MarkDown' });
                    return;
                }

                if (current_step.startsWith('admin_waiting_add_balance_amount|')) {
                    const target_uid = current_step.split('|')[1];
                    const amount = parseFloat(text);
                    if (isNaN(amount) || amount <= 0) {
                        await bot('sendMessage', { 'chat_id': chat_id, 'text': "⚠️ مبلغ غير صالح. أرسل رقماً صحيحاً:", 'parse_mode': 'MarkDown' });
                        return;
                    }
                    if (!users[target_uid].balance) users[target_uid].balance = 0;
                    users[target_uid].balance = parseFloat(users[target_uid].balance) + amount;
                    save_users(users);
                    delete send.user_step[id];
                    sends(send);
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': `✅ **تمت إضافة مبلغ ${amount}$ للمستخدم (\`${target_uid}\`) بنجاح!**\nرصيده الحالي: ${users[target_uid].balance}$`, 'parse_mode': 'MarkDown' });
                    await bot('sendMessage', { 'chat_id': target_uid, 'text': `🎉 **تم شحن رصيدك بقيمة ${amount}$ من قبل الإدارة!**`, 'parse_mode': 'MarkDown' });
                    return;
                }

                if (current_step === 'admin_waiting_sub_balance_id') {
                    const target_uid = text.trim();
                    if (!users[target_uid]) {
                        await bot('sendMessage', { 'chat_id': chat_id, 'text': "⚠️ المستخدم غير مسجل في البوت. أرسل آيدي صحيح:", 'parse_mode': 'MarkDown' });
                        return;
                    }
                    send.user_step[id] = `admin_waiting_sub_balance_amount|${target_uid}`;
                    sends(send);
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': "💵 أرسل الآن المبلغ المراد خصمه:", 'parse_mode': 'MarkDown' });
                    return;
                }

                if (current_step.startsWith('admin_waiting_sub_balance_amount|')) {
                    const target_uid = current_step.split('|')[1];
                    const amount = parseFloat(text);
                    if (isNaN(amount) || amount <= 0) {
                        await bot('sendMessage', { 'chat_id': chat_id, 'text': "⚠️ مبلغ غير صالح. أرسل رقماً صحيحاً:", 'parse_mode': 'MarkDown' });
                        return;
                    }
                    if (!users[target_uid].balance) users[target_uid].balance = 0;
                    users[target_uid].balance = Math.max(0, parseFloat(users[target_uid].balance) - amount);
                    save_users(users);
                    delete send.user_step[id];
                    sends(send);
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': `✅ **تم خصم مبلغ ${amount}$ من المستخدم (\`${target_uid}\`) بنجاح!**\nرصيده الحالي: ${users[target_uid].balance}$`, 'parse_mode': 'MarkDown' });
                    return;
                }

                if (current_step === 'admin_waiting_ban_id') {
                    const target_uid = text.trim();
                    let b_list = get_banned();
                    b_list.push(target_uid);
                    save_banned(b_list);
                    delete send.user_step[id];
                    sends(send);
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': `🚫 **تم حظر المستخدم (\`${target_uid}\`) بنجاح!**`, 'parse_mode': 'MarkDown' });
                    return;
                }

                if (current_step === 'admin_waiting_unban_id') {
                    const target_uid = text.trim();
                    let b_list = get_banned();
                    b_list = b_list.filter(uid => uid !== target_uid);
                    save_banned(b_list);
                    delete send.user_step[id];
                    sends(send);
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': `✅ **تم إلغاء حظر المستخدم (\`${target_uid}\`) بنجاح!**`, 'parse_mode': 'MarkDown' });
                    return;
                }
            }

            if (data && data === "transfer_balance_start") {
                send.user_step[id] = 'waiting_transfer_id';
                sends(send);
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "💸 **تحويل رصيد لمستخدم آخر:**\n\nأرسل الآن الآيدي (ID) الشخص الذي تريد تحويل الرصيد إليه:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [[{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]]
                    })
                });
                return;
            }

            if (data && data === "receive_balance_start") {
                const u_bal = users[id] ? users[id].balance || 0 : 0;
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': `📥 **استلام رصيد:**\n\nرصيدك الحالي هو: **${u_bal}$**\nيمكنك استقبال تحويلات الرصيد من أي مستخدم آخر عبر آيدي الخاص بك: \`${id}\``,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [[{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]]
                    })
                });
                return;
            }

            if (send.user_step[id] === 'waiting_transfer_id' && text) {
                const target_id = text.trim();
                if (!/^[0-9]+$/.test(target_id) || !users[target_id]) {
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': "⚠️ **عذراً، الآيدي المدخل غير صحيح أو أن المستخدم غير مسجل في البوت.**\nأرسل الآيدي الصحيح مجدداً:", 'parse_mode': 'MarkDown' });
                    return;
                }
                if (target_id === String(id)) {
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': "⚠️ لا يمكنك تحويل رصيد لنفسك! أرسل آيدي شخص آخر:", 'parse_mode': 'MarkDown' });
                    return;
                }
                send.user_step[id] = 'waiting_transfer_amount|' + target_id;
                sends(send);
                await bot('sendMessage', { 'chat_id': chat_id, 'text': "💵 **تم التحقق من الآيدي بنجاح.**\nأرسل الآن المبلغ المراد تحويله:", 'parse_mode': 'MarkDown' });
                return;
            }

            if (send.user_step[id] && send.user_step[id].startsWith('waiting_transfer_amount|') && text) {
                const ex_st = send.user_step[id].split('|');
                const target_id = ex_st[1];
                const amount = parseFloat(text);
                const my_bal = parseFloat(users[id] ? users[id].balance || 0 : 0);

                if (isNaN(amount) || amount <= 0 || my_bal < amount) {
                    await bot('sendMessage', { 'chat_id': chat_id, 'text': `⚠️ **المبلغ المدخل غير صالح أو رصيدك غير كافي.**\nرصيدك الحالي: ${my_bal}$. أرسل مبلغاً صحيحاً:`, 'parse_mode': 'MarkDown' });
                    return;
                }

                users[id].balance = my_bal - amount;
                if (!users[target_id].balance) users[target_id].balance = 0;
                users[target_id].balance = parseFloat(users[target_id].balance) + amount;
                save_users(users);
                delete send.user_step[id];
                sends(send);

                await bot('sendMessage', { 'chat_id': chat_id, 'text': `✅ **تم تحويل مبلغ ${amount}$ بنجاح إلى المستخدم (${target_id})!**`, 'parse_mode': 'MarkDown' });
                await bot('sendMessage', { 'chat_id': target_id, 'text': `🎉 **لقد استلمت تحويل رصيد بقيمة ${amount}$ بنجاح!**`, 'parse_mode': 'MarkDown' });

                if (admin && admin.length > 0) {
                    const admin_notif_target = admin[0];
                    await bot('sendMessage', {
                        'chat_id': admin_notif_target,
                        'text': `💸 **عملية تحويل رصيد جديدة بين المستخدمين:**\n\n👤 المرسل: \`${id}\`\n🎯 المستلم: \`${target_id}\`\n💰 المبلغ: \`${amount}$\`\n📆 ${DAY2}`,
                        'parse_mode': "MarkDown",
                        'reply_markup': JSON.stringify({
                            'inline_keyboard': [
                                [{ 'text': "👤 معرف العضو (المرسل)", 'url': `tg://user?id=${id}` }],
                                [{ 'text': "👤 معرف العضو (المستلم)", 'url': `tg://user?id=${target_id}` }]
                            ]
                        })
                    });
                }
                return;
            }

            if (data && data === "continents_menu") {
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "🌍 **قسم عروض القارات**\n\nاختر القارة التي ترغب في استعراض أرقامها:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [{ 'text': "🇶🇦 🇸🇦 الدول العربية 🇪🇬 🇾🇪", 'callback_data': "arab_countries" }],
                            [{ 'text': "🇪🇺 قارة أوروبا", 'callback_data': "europe_countries" }, { 'text': "🌍 قارة أفريقيا", 'callback_data': "africa_countries" }],
                            [{ 'text': "🌏 قارة آسيا", 'callback_data': "asia_countries" }, { 'text': "🌎 أمريكا وأوقيانوسيا", 'callback_data': "foreign_countries" }],
                            [{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]
                        ]
                    })
                });
                return;
            }

            if (data && data === "social_offers_menu") {
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "📱 **اختر تطبيق التواصل الاجتماعي المطلوب:**",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [{ 'text': "WhatsApp 🟢", 'callback_data': "set_app_wa" }, { 'text': "Telegram ✈️", 'callback_data': "set_app_tg" }],
                            [{ 'text': "Instagram 📸", 'callback_data': "set_app_ig" }, { 'text': "TikTok 🎵", 'callback_data': "set_app_tk" }],
                            [{ 'text': "Facebook 📘", 'callback_data': "set_app_fb" }, { 'text': "Twitter / X 🐦", 'callback_data': "set_app_tw" }],
                            [{ 'text': "Google / Gmail 🌐", 'callback_data': "set_app_go" }],
                            [{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]
                        ]
                    })
                });
                return;
            }

            if (data && data.startsWith("set_app_")) {
                const app_code_map = {
                    'set_app_wa': 'wa', 'set_app_tg': 'tg', 'set_app_ig': 'ig',
                    'set_app_tk': 'tk', 'set_app_fb': 'fb', 'set_app_tw': 'tw',
                    'set_app_go': 'go', 'set_app_vi': 'vi', 'set_app_sn': 'sn',
                    'set_app_ha': 'ha', 'set_app_im': 'im'
                };
                const selected_app = app_code_map[data] || 'wa';
                const st = get_storage();
                st.app = selected_app;
                save_storage(st);

                const page = 1;
                const all_indices = Object.keys(_co_country).map(Number);
                const items_per_page = 20;
                const total_pages = Math.ceil(all_indices.length / items_per_page);
                const start_offset = (page - 1) * items_per_page;
                const current_indices = all_indices.slice(start_offset, start_offset + items_per_page);

                let keyboard = { 'inline_keyboard': [] };
                keyboard.inline_keyboard.push([{ 'text': `🌐 جميع الدول المتاحة (صفحة ${page} من ${total_pages})`, 'callback_data': 'no_thing' }]);
                let row = [];
                for (const index of current_indices) {
                    if (_co_country[index]) {
                        const c_name = _co_country[index];
                        const c_code = _co_o_country[index] || "+";
                        row.push({ 'text': c_name, 'callback_data': `buy_num|${index}|${c_code}` });
                        if (row.length === 2) {
                            keyboard.inline_keyboard.push(row);
                            row = [];
                        }
                    }
                }
                if (row.length > 0) keyboard.inline_keyboard.push(row);

                let nav = [];
                if (page < total_pages) nav.push({ 'text': "التالي ➡️", 'callback_data': `all_countries_page_${page + 1}` });
                if (nav.length > 0) keyboard.inline_keyboard.push(nav);
                keyboard.inline_keyboard.push([
                    { 'text': "🔙 الرجوع", 'callback_data': "social_offers_menu" },
                    { 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }
                ]);

                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': `🌐 **جميع الدول المتاحة لطلب الأرقام (تطبيق: ${selected_app}):**`,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify(keyboard)
                });
                return;
            }

            if (data && data.startsWith("all_countries_page_")) {
                const ex = data.split("_");
                let page = parseInt(ex[3]) || 1;
                const all_indices = Object.keys(_co_country).map(Number);
                const items_per_page = 20;
                const total_pages = Math.ceil(all_indices.length / items_per_page);
                if (page > total_pages) page = total_pages;
                if (page < 1) page = 1;
                const start_offset = (page - 1) * items_per_page;
                const current_indices = all_indices.slice(start_offset, start_offset + items_per_page);

                let keyboard = { 'inline_keyboard': [] };
                keyboard.inline_keyboard.push([{ 'text': `🌐 جميع الدول المتاحة (صفحة ${page} من ${total_pages})`, 'callback_data': 'no_thing' }]);
                let row = [];
                for (const index of current_indices) {
                    if (_co_country[index]) {
                        const c_name = _co_country[index];
                        const c_code = _co_o_country[index] || "+";
                        row.push({ 'text': c_name, 'callback_data': `buy_num|${index}|${c_code}` });
                        if (row.length === 2) {
                            keyboard.inline_keyboard.push(row);
                            row = [];
                        }
                    }
                }
                if (row.length > 0) keyboard.inline_keyboard.push(row);

                let nav = [];
                if (page > 1) nav.push({ 'text': "⬅️ السابق", 'callback_data': `all_countries_page_${page - 1}` });
                if (page < total_pages) nav.push({ 'text': "التالي ➡️", 'callback_data': `all_countries_page_${page + 1}` });
                if (nav.length > 0) keyboard.inline_keyboard.push(nav);
                keyboard.inline_keyboard.push([
                    { 'text': "🔙 الرجوع", 'callback_data': "social_offers_menu" },
                    { 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }
                ]);

                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "🌐 **جميع الدول المتاحة لطلب الأرقام:**",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify(keyboard)
                });
                return;
            }

            if (data && data === "arab_countries") {
                let keyboard = { 'inline_keyboard': [] };
                keyboard.inline_keyboard.push([{ 'text': 'اختر الدولة العربية ⬇️', 'callback_data': 'no_thing' }]);
                let row = [];
                for (const index of arab_indices) {
                    if (_co_country[index]) {
                        const c_name = _co_country[index];
                        const c_code = _co_o_country[index] || "+";
                        row.push({ 'text': c_name, 'callback_data': `buy_num|${index}|${c_code}` });
                        if (row.length === 2) {
                            keyboard.inline_keyboard.push(row);
                            row = [];
                        }
                    }
                }
                if (row.length > 0) keyboard.inline_keyboard.push(row);
                keyboard.inline_keyboard.push([
                    { 'text': "🔙 الرجوع", 'callback_data': "continents_menu" },
                    { 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }
                ]);

                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "🇶🇦 🇸🇦 **قسم الدول العربية** 🇪🇬 🇾🇪\n\nاختر الدولة التي ترغب في طلب رقم منها:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify(keyboard)
                });
                return;
            }

            if (data && (data === "europe_countries" || data.startsWith("europe_page_"))) {
                let page = 1;
                if (data.startsWith("europe_page_")) {
                    page = parseInt(data.split("_")[2]) || 1;
                }
                const items_per_page = 20;
                const total_pages = Math.ceil(europe_indices.length / items_per_page);
                if (page > total_pages) page = Math.max(1, total_pages);
                const start_offset = (page - 1) * items_per_page;
                const current_indices = europe_indices.slice(start_offset, start_offset + items_per_page);

                let keyboard = { 'inline_keyboard': [] };
                keyboard.inline_keyboard.push([{ 'text': `🇪🇺 قارة أوروبا (صفحة ${page} من ${total_pages})`, 'callback_data': 'no_thing' }]);
                let row = [];
                for (const index of current_indices) {
                    if (_co_country[index]) {
                        const c_name = _co_country[index];
                        const c_code = _co_o_country[index] || "+";
                        row.push({ 'text': c_name, 'callback_data': `buy_num|${index}|${c_code}` });
                        if (row.length === 2) {
                            keyboard.inline_keyboard.push(row);
                            row = [];
                        }
                    }
                }
                if (row.length > 0) keyboard.inline_keyboard.push(row);

                let nav = [];
                if (page > 1) nav.push({ 'text': "⬅️ السابق", 'callback_data': `europe_page_${page - 1}` });
                if (page < total_pages) nav.push({ 'text': "التالي ➡️", 'callback_data': `europe_page_${page + 1}` });
                if (nav.length > 0) keyboard.inline_keyboard.push(nav);
                keyboard.inline_keyboard.push([
                    { 'text': "🔙 الرجوع", 'callback_data': "continents_menu" },
                    { 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }
                ]);

                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "🇪🇺 **قارة أوروبا**\n\nاختر الدولة الأوروبية المطلوبة للطلب:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify(keyboard)
                });
                return;
            }

            if (data && (data === "africa_countries" || data.startsWith("africa_page_"))) {
                let page = 1;
                if (data.startsWith("africa_page_")) {
                    page = parseInt(data.split("_")[2]) || 1;
                }
                const items_per_page = 20;
                const total_pages = Math.ceil(africa_indices.length / items_per_page);
                if (page > total_pages) page = Math.max(1, total_pages);
                const start_offset = (page - 1) * items_per_page;
                const current_indices = africa_indices.slice(start_offset, start_offset + items_per_page);

                let keyboard = { 'inline_keyboard': [] };
                keyboard.inline_keyboard.push([{ 'text': `🌍 قارة أفريقيا (صفحة ${page} من ${total_pages})`, 'callback_data': 'no_thing' }]);
                let row = [];
                for (const index of current_indices) {
                    if (_co_country[index]) {
                        const c_name = _co_country[index];
                        const c_code = _co_o_country[index] || "+";
                        row.push({ 'text': c_name, 'callback_data': `buy_num|${index}|${c_code}` });
                        if (row.length === 2) {
                            keyboard.inline_keyboard.push(row);
                            row = [];
                        }
                    }
                }
                if (row.length > 0) keyboard.inline_keyboard.push(row);

                let nav = [];
                if (page > 1) nav.push({ 'text': "⬅️ السابق", 'callback_data': `africa_page_${page - 1}` });
                if (page < total_pages) nav.push({ 'text': "التالي ➡️", 'callback_data': `africa_page_${page + 1}` });
                if (nav.length > 0) keyboard.inline_keyboard.push(nav);
                keyboard.inline_keyboard.push([
                    { 'text': "🔙 الرجوع", 'callback_data': "continents_menu" },
                    { 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }
                ]);

                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "🌍 **قارة أفريقيا**\n\nاختر الدولة الإفريقية المطلوبة للطلب:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify(keyboard)
                });
                return;
            }

            if (data && (data === "asia_countries" || data.startsWith("asia_page_"))) {
                let page = 1;
                if (data.startsWith("asia_page_")) {
                    page = parseInt(data.split("_")[2]) || 1;
                }
                const items_per_page = 20;
                const total_pages = Math.ceil(asia_indices.length / items_per_page);
                if (page > total_pages) page = Math.max(1, total_pages);
                const start_offset = (page - 1) * items_per_page;
                const current_indices = asia_indices.slice(start_offset, start_offset + items_per_page);

                let keyboard = { 'inline_keyboard': [] };
                keyboard.inline_keyboard.push([{ 'text': `🌏 قارة آسيا (صفحة ${page} من ${total_pages})`, 'callback_data': 'no_thing' }]);
                let row = [];
                for (const index of current_indices) {
                    if (_co_country[index]) {
                        const c_name = _co_country[index];
                        const c_code = _co_o_country[index] || "+";
                        row.push({ 'text': c_name, 'callback_data': `buy_num|${index}|${c_code}` });
                        if (row.length === 2) {
                            keyboard.inline_keyboard.push(row);
                            row = [];
                        }
                    }
                }
                if (row.length > 0) keyboard.inline_keyboard.push(row);

                let nav = [];
                if (page > 1) nav.push({ 'text': "⬅️ السابق", 'callback_data': `asia_page_${page - 1}` });
                if (page < total_pages) nav.push({ 'text': "التالي ➡️", 'callback_data': `asia_page_${page + 1}` });
                if (nav.length > 0) keyboard.inline_keyboard.push(nav);
                keyboard.inline_keyboard.push([
                    { 'text': "🔙 الرجوع", 'callback_data': "continents_menu" },
                    { 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }
                ]);

                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "🌏 **قارة آسيا**\n\nاختر الدولة الآسيوية المطلوبة للطلب:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify(keyboard)
                });
                return;
            }

            if (data && (data === "foreign_countries" || data.startsWith("foreign_page_"))) {
                let page = 1;
                if (data.startsWith("foreign_page_")) {
                    page = parseInt(data.split("_")[2]) || 1;
                }
                const items_per_page = 20;
                const total_pages = Math.ceil(foreign_indices.length / items_per_page);
                const start_offset = (page - 1) * items_per_page;
                const current_indices = foreign_indices.slice(start_offset, start_offset + items_per_page);

                let keyboard = { 'inline_keyboard': [] };
                keyboard.inline_keyboard.push([{ 'text': `الدول الأجنبية (صفحة ${page} من ${total_pages})`, 'callback_data': 'no_thing' }]);
                let row = [];
                for (const index of current_indices) {
                    if (_co_country[index]) {
                        const c_name = _co_country[index];
                        const c_code = _co_o_country[index] || "+";
                        row.push({ 'text': c_name, 'callback_data': `buy_num|${index}|${c_code}` });
                        if (row.length === 2) {
                            keyboard.inline_keyboard.push(row);
                            row = [];
                        }
                    }
                }
                if (row.length > 0) keyboard.inline_keyboard.push(row);

                let nav = [];
                if (page > 1) nav.push({ 'text': "⬅️ السابق", 'callback_data': `foreign_page_${page - 1}` });
                if (page < total_pages) nav.push({ 'text': "التالي ➡️", 'callback_data': `foreign_page_${page + 1}` });
                if (nav.length > 0) keyboard.inline_keyboard.push(nav);
                keyboard.inline_keyboard.push([
                    { 'text': "🔙 الرجوع", 'callback_data': "continents_menu" },
                    { 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }
                ]);

                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "🌎 **قسم أمريكا وأوقيانوسيا** 🌍\n\nاختر الدولة المطلوبة للطلب:",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify(keyboard)
                });
                return;
            }

            if (data && data === "my_account") {
                const u_bal = users[id] ? users[id].balance || 0 : 0;
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': `👤 **معلومات حسابك**\n\n🆔 الآيدي: \`${id}\`\n💰 الرصيد المتاح: *${u_bal}$*\n\nلشحن رصيدك يرجى التواصل مع إدارة البوت.`,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]
                        ]
                    })
                });
                return;
            }

            if (data && data === "instructions") {
                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': "📜 **تعليمات الاستخدام:**\n1. اختر الدولة والتطبيق المطلوب.\n2. قم بطلب الرقم ونسخه للواتساب أو التطبيق المحدد.\n3. اضغط تحديث لجلب كود التفعيل عند إرساله من الموقع.\n4. في حال لم يصل الكود، يمكنك إلغاء الرقم واسترجاع قيمته.",
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]
                        ]
                    })
                });
                return;
            }
        }

        if (data && data.startsWith("buy_num")) {
            const ex = data.split("|");
            const c_index = ex[1];
            const c_code = ex[2];
            const c_name = _co_country[c_index] || "الدولة";

            const st_app = get_storage();
            const service_app = st_app.app || "wa";

            const res_prices = await smsbower_req("getPrices", { 'service': service_app });
            let number_cost = 1.0;
            try {
                const prices_data = JSON.parse(res_prices);
                if (prices_data && prices_data[c_index]) {
                    const app_offers = prices_data[c_index][service_app] || Object.values(prices_data[c_index])[0];
                    if (app_offers && typeof app_offers === 'object') {
                        for (const [k, v] of Object.entries(app_offers)) {
                            if (k !== 'count') {
                                number_cost = parseFloat(v) || 1.0;
                                break;
                            }
                        }
                    }
                }
            } catch (e) {}

            const user_balance = parseFloat(users[id] ? users[id].balance || 0 : 0);
            if (user_balance < number_cost && !admins_list.includes(String(id))) {
                await bot('answerCallbackQuery', {
                    'callback_query_id': update.callback_query.id,
                    'text': `⚠️ رصيدك غير كافي (${user_balance}$). تكلفة الرقم هي ${number_cost}. يرجى شحن رصيدك أولاً!`,
                    'show_alert': true
                });
                return;
            }

            const res = await smsbower_req("getNumber", {
                'service': service_app,
                'country': c_index
            });

            if (res === "NO_API_KEY") {
                await bot('answerCallbackQuery', {
                    'callback_query_id': update.callback_query.id,
                    'text': '⚠️ لم يتم ضبط API Key لموقع SMSBower من قبل الأدمن!',
                    'show_alert': true
                });
                return;
            }

            if (res.includes("ACCESS_NUMBER")) {
                const exp = res.split(":");
                const order_id = exp[1];
                let phone_num = exp[2];

                if (!phone_num.startsWith('+')) {
                    phone_num = '+' + phone_num.replace(/^\+/, '');
                }

                if (ehabeeeeee) {
                    const bot_info_p = await bot('getMe');
                    const bot_username_p = bot_info_p && bot_info_p.result ? bot_info_p.result.username || '' : '';
                    const bot_link_p = bot_username_p ? `https://t.me/${bot_username_p}` : "https://t.me/";

                    await bot('sendMessage', {
                        'chat_id': ehabeeeeee,
                        'text': `
<b>⚠️ ︙ زبون︙قام بشراء رقم جديد لتطبيق ${service_app} 🛒
➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
🌍 ︙ الدولة : ${c_name}
📲 ︙ التطبيق : ${service_app}
📞 ︙ الرقم : <code>${phone_num}</code>
💰 ︙ التكلفة : ₽ ${number_cost}
🆔 ︙ العميل : ${id}
➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
📆 - ${DAY2} </b>`,
                        'parse_mode': "html",
                        'reply_markup': JSON.stringify({
                            'inline_keyboard': [
                                [
                                    { 'text': "👤 كشف العضو", 'url': `tg://user?id=${id}` },
                                    { 'text': "🔙 العودة إلى البوت", 'url': bot_link_p }
                                ]
                            ]
                        })
                    });
                }

                const randomNumber = Math.floor(10000 + Math.random() * 90000);
                const cost = number_cost;
                const start_time = new Date(Date.now() + 15 * 60000).toISOString().replace('T', ' ').substring(0, 19);

                await bot("sendMessage", {
                    'chat_id': chat_id,
                    'text': `
<b>➖ رقم الطلب | <s>${randomNumber}</s> 🛎•</b>
<b>➖ الدولة | ${c_name} •</b>
<b>➖ الرقم | <code>${phone_num}</code>  ☎️•</b>
<b>➖ الكود | قيد الانتظار 📩</b>
<b>➖ الحالة | RECEIVED ... 🔎•</b>
<b>➖ السعر | ₽ ${cost} 💙•</b>
<b>➖ التكلفة | ₽ ${number_cost} 💙•</b>
<b>➖ الطلب |  ${order_id} 💙•</b>
<b>➖ انشاء : ${DAY3} •  📫•</b>
<b>➖ انتهاء : ${start_time}   📭•</b>
<pre>➖ عدد المحاولات الشراء : 1 •</pre>
`,
                    'parse_mode': "html",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [{ 'text': "🔄- تغيير رقم آخر -🔄", 'callback_data': `change_num|${phone_num}|${order_id}|${number_cost}|${c_index}` }],
                            [{ 'text': "☑️-  طلب  الكود -☑️", 'callback_data': `get_code|${phone_num}|${order_id}|${number_cost}|${c_index}|${c_name}` }],
                            [{ 'text': "⚠️- الغاء الرقم -⚠️", 'callback_data': `cancel_num|${phone_num}|${order_id}|${number_cost}|${c_index}` }],
                            [{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]
                        ]
                    })
                });
            } else {
                await bot('answerCallbackQuery', {
                    'callback_query_id': update.callback_query.id,
                    'text': `❌ السيرفر أفاد بـ: ${res} (قد تكون الأرقام غير متوفرة حالياً)`,
                    'show_alert': true
                });
            }
            return;
        }

        if (data && data.startsWith("get_code")) {
            const exdata = data.split("|");
            const num = exdata[1];
            const idnumber = exdata[2];
            const cost = parseFloat(exdata[3] || 0);
            const c_index = exdata[4] || 0;
            const c_name = exdata[5] || (_co_country[c_index] || "الدولة");

            const res = await smsbower_req("getStatus", { 'id': idnumber });

            if (res.includes("STATUS_OK")) {
                const exp = res.split(":");
                const code = exp[1];

                if (!admins_list.includes(String(id))) {
                    if (users[id]) {
                        users[id].balance = parseFloat(users[id].balance || 0) - cost;
                        save_users(users);
                    }
                }

                let num_masked = num;
                if (num_masked.length >= 6) {
                    num_masked = num_masked.substring(0, num_masked.length - 3) + '***';
                }

                const randomNumber = Math.floor(10000 + Math.random() * 90000);
                const st_app = get_storage();
                const service_app = st_app.app || "wa";

                if (ehabme) {
                    const bot_info = await bot('getMe');
                    const bot_username = bot_info && bot_info.result ? bot_info.result.username || '' : '';
                    const bot_link = bot_username ? `https://t.me/${bot_username}` : "https://t.me/";

                    await bot("sendMessage", {
                        'chat_id': ehabme,
                        'text': `
<b>✳️ ︙ تم شراء رقم من البوت بنجاح 🔮
➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
💻  ︙ رقم الطلب ${randomNumber}
🎛  ︙ السيرفر : عروض برامج التواصل
🌍  ︙ الدولة : ${c_name}
📲  ︙ تطبيق : ${service_app}
📞  ︙ الرقم  : ${num_masked}
💰  ︙ السعر : ₽ ${cost}
🆔  ︙ العميل : ${id}
📥  ︙ رسالة الكود :  [&nbsp;<tg-spoiler>${code}</tg-spoiler> ]💡•
➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
📆 - ${DAY2} </b>`,
                        'parse_mode': "html",
                        'reply_markup': JSON.stringify({
                            'inline_keyboard': [
                                [{ 'text': "• ↩️ قناة ايش المتوفر 🚀•", 'url': ehab_link }],
                                [{ 'text': "↗️ - شراء رقم من البوت 🤖", 'url': bot_link }]
                            ]
                        })
                    });
                }

                await bot('EditMessageText', {
                    'chat_id': chat_id,
                    'message_id': message_id,
                    'text': `
      𓆩•|ـــــــ(${jiminot})ــــــ|•𓆪 ⬇️
▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱
➖ 🌟 - تم شراء الرقم هاذا شكرا لك 👇🦋

➖✅ الرقم  : \`${num}\`

➖ ✅ - إضغط على الكود  للنسخ 👇🌸

➖💬 الكود : \`${code}\`

📆 - ${DAY2}
▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱
`,
                    'parse_mode': "MarkDown",
                    'reply_markup': JSON.stringify({
                        'inline_keyboard': [
                            [{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]
                        ]
                    })
                });
            } else if (res === "STATUS_WAIT_CODE") {
                await bot('answerCallbackQuery', {
                    'callback_query_id': update.callback_query.id,
                    'text': "⏳ لم يتم استلام الكود بعد، يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.",
                    'show_alert': true
                });
            } else {
                await bot('answerCallbackQuery', {
                    'callback_query_id': update.callback_query.id,
                    'text': `ℹ️ حالة الرقم الحالية: ${res}`,
                    'show_alert': true
                });
            }
            return;
        }

        if (data && data.startsWith("cancel_num")) {
            const ex = data.split("|");
            const order_id = ex[2];
            const res = await smsbower_req("setStatus", { 'status': 8, 'id': order_id });
            await bot('answerCallbackQuery', {
                'callback_query_id': update.callback_query.id,
                'text': `⚠️ تم إلغاء الرقم. رد السيرفر: ${res}`,
                'show_alert': true
            });
            await bot('EditMessageText', {
                'chat_id': chat_id,
                'message_id': message_id,
                'text': "❌ **تم إلغاء الرقم بنجاح.**",
                'parse_mode': "MarkDown",
                'reply_markup': JSON.stringify({
                    'inline_keyboard': [[{ 'text': "🏠 القائمة الرئيسية", 'callback_data': "user_home" }]]
                })
            });
            return;
        }

        if (data && data.startsWith("change_num")) {
            const ex = data.split("|");
            const order_id = ex[2];
            await smsbower_req("setStatus", { 'status': 8, 'id': order_id });
            await bot('answerCallbackQuery', {
                'callback_query_id': update.callback_query.id,
                'text': "🔄 تم طلب تغيير الرقم...",
                'show_alert': true
            });
            return;
        }

    } catch (error) {
        console.error(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot server is running on port ${PORT}`);
});
