import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
en: {
translation: {
brand: {
title: "Eigo for All",
slogan: "Fun English for Every Classroom",
},
nav: {
home: "Home",
activities: "Activities",
materials: "English Teaching Materials",
about: "About",
signup: "Sign Up",
contact: "Contact Us",
signout: "Sign Out",
signin: "Sign In",
profile:"Show Profile",
delete:"Delete Account"
},
home: {
ctaActivities: "Explore Activities",
ctaMaterials: "Browse Materials",
featured: "Featured Activities",
},
grades: {
g1: "Grade 1",
g2: "Grade 2",
g3: "Grade 3",
g4: "Grade 4",
g5: "Grade 5",
g6: "Grade 6",
g7: "Grade 7",
g8: "Grade 8",
g9: "Grade 9",
},
activities:{
    grade1:{
        colorActivity:{
            title:"The Color Activity",
            description:"Listen and choose the correct color."
        }
    },
        grade2:{
        sportActivity:{
            title:"The Sport Activity",
            description:"Listen and choose the correct picture."
        }
    },
        grade3:{
        capitalLettersActivity:{
            title:"The Capital Letters Activity",
            description:"Listen and choose the correct letter."
        }
    },
      grade4:{
        smallLettersActivity:{
            title:"The Small Letters Activity",
            description:"Listen and choose the correct letter."
        }
    },
      grade5:{
        greetingActivity:{
            title:"The Greeting Conversation Activity",
            description:"Listen and fill in the blanks."
        }
    },
    grade6:{
        greetingActivity:{
            title:"The Greeting Questions Activity",
            description:"Listen to the question and choose the best answer."
        }
    },
    grade7:{
        verbToBeActivity:{
            title:"Verb to-be Activity",
            description:"Write the correct form of verb to-be."
        }
    },
    grade8:{
        futureTenseActivity:{
            title:"Future Tense Activity",
            description:"Put the sentence in the correct order."
        }
    },
    grade9:{
        presentPerfectActivity:{
            title:"Present Perfect Activity",
            description:"Put the sentence in the correct order."
        }
    }
},
about:{
    title:"About This Website",
    purpose:"Welcome to Eigo for All! This site is designed for school students in Japan to practice English grammar and vocabulary in a fun, interactive way.",
    howToUse:" You can choose your grade and start different activities — such as listening, drag-and-drop, fill-in-the-blanks, and sentence ordering activities — all designed to help you enjoy learning English!",
    credits:" Created by Nael Matsui, an ALT and web developer who believes that learning should be engaging and enjoyable.",
    button:"Start Learning",
},
contact:{
    header:"Contact Us",
    text:"We’d love to hear from you! Whether you have a question, feedback, or suggestion,please fill out the form below.",
    name:"Your Name",
    email:"Your Email Address",
    subject:{
        s1:"General Inquiry",
        s2:"Suggest an Improvement",
        s3:"Report a Problem",
        s4:"Other"
    },
    message:"Type your message here...",
    send:"Send Message",
    confirmation:"Thank you for your message! We’ll get back to you as soon as possible.",
    alternative:"Alternative Contact Methods"
},
signup:{
    title:"Sign Up",
    success:"Account created successfully!",
    googlesuccess:"Signed in with Google!",
    email:"Email",
    password:"Password",
    nick:"Nickname",
    student:"Student",
    teacher:"Teacher",
    emailsu:"Sign Up with Email",
    googlesi:"Sign in with Google",
    already:"Already have an account?",
    signin:"Sign In",
},
signin:{
    title:"Sign In",
    success:"Signed in successfully!",
    email:"Email",
    password:"Password",
    signin:"Sign In",
    noaccount:"Don't have an account?",
    signup:"Sign Up",
    forgot:"Forgot you password?"
},
err:{
   'auth/invalid-credential': "The email or password you entered is incorrect. Please try again.",
  'auth/wrong-password': "The email or password you entered is incorrect. Please try again.",
  'auth/user-not-found': "The email or password you entered is incorrect. Please try again.",
  'auth/invalid-email': "Please enter a valid email address.",
  'auth/too-many-requests': "Access temporarily blocked due to too many failed attempts. Try again later.",
  'auth/network-request-failed': "A network error occurred. Please check your internet connection.",
    'auth/email-already-in-use': "This email is already registered. Try signing in or use a different email.",
  'auth/invalid-email': "The email address is not formatted correctly.",
  'auth/weak-password': "The password is too weak. Please use at least 6 characters.",
  'auth/operation-not-allowed': "Email/Password sign-up is disabled.",
  'auth/popup-closed-by-user': "The sign-in popup window was closed. Please try again.",
  'auth/cancelled-popup-request': "The sign-in attempt was interrupted. Please try again.",
  'auth/missing-email':"Please enter a valid email.",
  'default': "An unexpected error occurred. Please try again.",
},
reset:{
     "title": "Password Reset",
  "send": "Send Reset Email",
  "sending": "Sending...",
  "success": "Password reset email sent successfully!",
  "back": "Go Back",
    "checkSpam": "Please check your spam or promotions folder if you don't see it."

},
account:{
    success:"✅ Profile updated successfully!",
    err:"❌ Error updating profile.",
    login:"Please log in to see your profile.",
    delete:"Delete Account",
    logout:"Log Out",
    info:"Account Information",
    email:"Email",
    nick:"Nickname",
    enter:"Enter nickname",
    role:"Role:",
    student:"Student",
    teacher:"Teacher",
    save:"Save Changes",
    favorite:"Favorite Activity:",
    correct:"Correct Answers",
}
}
},
ja: {
translation: {
brand: {
title: "えいごフォーオール",
slogan: "どの教室でも楽しく英語を",
},
nav: {
home: "ホーム",
activities: "アクティビティ",
materials: "英語教材",
about: "紹介",
signup: "サインアップ",
signin:"サインイン",
contact: "お問い合わせ",
profile: "プロフィールを表示",
delete: "アカウントを削除",
signout: "サインアウト",
},
home: {
ctaActivities: "アクティビティを見る",
ctaMaterials: "教材を探す",
featured: "おすすめアクティビティ",
},
grades: {
    g1: "小１",
    g2: "小２",
    g3: "小３",
    g4: "小４",
    g5: "小５",
    g6: "小６",
    g7: "中１",
    g8: "中２",
    g9: "中３",
},
activities : {
    grade1: {
        colorActivity: {
            title: "カラーアクティビティ",
            description: "聞いて正しい色を選びましょう。"
        }
    },
    grade2: {
        sportActivity: {
            title: "スポーツアクティビティ",
            description: "聞いて正しい絵を選びましょう。"
        }
    },
    grade3: {
        capitalLettersActivity: {
            title: "大文字アクティビティ",
            description: "聞いて正しい文字を選びましょう。"
        }
    },
    grade4: {
        smallLettersActivity: {
            title: "小文字アクティビティ",
            description: "聞いて正しい文字を選びましょう。"
        }
    },
    grade5: {
        greetingActivity: {
            title: "あいさつ会話アクティビティ",
            description: "聞いて空欄に答えを入れましょう。"
        }
    },
    grade6: {
        greetingActivity: {
            title: "あいさつ質問アクティビティ",
            description: "質問を聞いていちばんよい答えを選びましょう。"
        }
    },
    grade7: {
        verbToBeActivity: {
            title: "be動詞アクティビティ",
            description: "正しいbe動詞の形を書きましょう。"
        }
    },
    grade8: {
        futureTenseActivity: {
            title: "未来形アクティビティ",
            description: "文を正しい順番に並べましょう。"
        }
    },
    grade9: {
        presentPerfectActivity: {
            title: "現在完了形アクティビティ",
            description: "文を正しい順番に並べましょう。"
        }
    }
}
,
about: {
    title: "このサイトについて",
    purpose: "Eigo for All へようこそ！このサイトは、日本の学校の生徒が楽しく英語の文法や語彙を練習できるように作られています。",
    howToUse: "学年を選んで、リスニング、ドラッグ＆ドロップ、穴埋め、並べ替えなど、さまざまなアクティビティを始めることができます。楽しみながら英語を学びましょう！",
    credits: "このサイトは、ALTでありウェブ開発者でもあるナエル・マツイによって作られました。彼は「学ぶことは楽しくあるべきだ」と信じています。",
    button: "学習を始める",
},
contact: {
    header: "お問い合わせ",
    text: "ご質問、ご意見、またはご提案がありましたら、ぜひ下記のフォームにご記入ください。",
    name: "お名前",
    email: "メールアドレス",
    subject: {
        s1: "一般的なお問い合わせ",
        s2: "改善の提案",
        s3: "問題の報告",
        s4: "その他"
    },
    message: "ここにメッセージを入力してください...",
    send: "送信",
    confirmation: "メッセージを送信いただきありがとうございます。できるだけ早くご返信いたします。",
    alternative: "その他の連絡方法"
},
signup:{
    title:"新規登録",
    success:"アカウントが正常に作成されました！",
    googlesuccess:"Googleでサインインしました！",
    email:"メールアドレス",
    password:"パスワード",
    nick:"ニックネーム",
    student:"生徒",
    teacher:"教師",
    emailsu:"メールアドレスで登録",
    googlesi:"Googleでサインイン",
    already:"すでにアカウントをお持ちですか？",
    signin:"サインイン",
},
signin:{
    title:"サインイン",
    success:"正常にサインインしました!",
    email:"メールアドレス",
    password:"パスワード",
    signin:"サインイン",
    noaccount:"アカウントをお持ちではありませんか?",
    signup:"サインアップ",
    forgot:"パスワードをお忘れですか？"
},
err:{
   'auth/invalid-credential': "入力されたメールアドレスまたはパスワードが正しくありません。もう一度お試しください。",
  'auth/wrong-password': "入力されたメールアドレスまたはパスワードが正しくありません。もう一度お試しください。",
  'auth/user-not-found': "入力されたメールアドレスまたはパスワードが正しくありません。もう一度お試しください。",
  'auth/invalid-email': "有効なメールアドレスを入力してください。",
  'auth/too-many-requests': "試行回数が多すぎるため、一時的にアクセスが制限されています。後でもう一度お試しください。",
  'auth/network-request-failed': "ネットワークエラーが発生しました。インターネット接続を確認してください。",
    'auth/email-already-in-use': "このメールアドレスはすでに登録されています。サインインするか、別のメールアドレスを使用してください。",
  'auth/invalid-email': "メールアドレスの形式が正しくありません。",
  'auth/weak-password': "パスワードが弱すぎます。６文字以上を使用してください。",
  'auth/operation-not-allowed': "メールアドレスとパスワードによる登録は無効になっています。",
  'auth/popup-closed-by-user': "サインインのポップアップウィンドウが閉じられました。もう一度お試しください。",
  'auth/cancelled-popup-request': "サインインの試行が中断されました。もう一度お試しください。",
    'auth/missing-email':"有効なメールアドレスを入力してください",
  'default': "予期しないエラーが発生しました。もう一度お試しください。",
},
reset: {
  "title": "パスワードのリセット",
  "send": "リセットメールを送信",
  "sending": "送信中...",
  "success": "パスワードリセットのメールを送信しました！",
  "back": "戻る",
  "checkSpam": "メールが届かない場合は、迷惑メールまたはプロモーションフォルダを確認してください。"
},
account: {
  success: "✅ プロフィールを更新しました！",
  err: "❌ プロフィールの更新中にエラーが発生しました。",
  login: "プロフィールを見るにはログインしてください。",
  delete: "アカウントを削除",
  logout: "ログアウト",
  info: "アカウント情報",
  email: "メールアドレス",
  nick: "ニックネーム",
  enter: "ニックネームを入力してください",
  role: "役割：",
  student: "生徒",
  teacher: "先生",
  save: "変更を保存",
  favorite: "好きなアクティビティ：",
  correct: "正解数",
}


},
},
};


i18n
.use(initReactI18next)
.use(LanguageDetector)
.init({
resources,
fallbackLng: "en",
detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],

      lookupLocalStorage: 'i18nextLng',
    },
interpolation: { escapeValue: false },
});
export default i18n;