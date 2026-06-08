// 各セクションのデフォルトの見出し
// ※ここで編集すると全ページに反映されますが、個別の作品ごとに自由なセクション名（キー）を追加することも可能です。
// 例: customSection: { title: "独自のセクション", text: "ここにテキスト..." }
const sectionTitles = {
    overview: "プロジェクトの概要 (Overview)",
    background: "開発の背景と目的",
    techStack: "使用技術・開発環境",
    architecture: "システムについて",
    challenges: "技術的な課題と解決策",
    achievements: "実績・対外的な評価",
    role: "担当箇所と開発体制",
    links: "成果物へのリンク",
    SystemArchitecture: "システム構成"
};

const portfolioData = [
    {
        id: "project-1",
        title: "動的な影の表現",
        shortDescription: "影を操作するインタラクション",
        date: "2025.04",
        client: "卒業論文",
        content: {
            gallery:[
                "assets/thumb1.png",
                "assets/thumb2.png",
                "assets/thumb3.png",
                "assets/thumb4.png"
            ],

            overview: {
                catchphrase: "影を操作するインタラクション",
                description: "卒業論文として、影を直接操作するインタラクティブシステムを制作。<br>仮想的なCGの影ではなく、実世界で物体から床に落ちている「現実の影」そのものに触れ、引き伸ばしたり移動させたりできる直感的な操作で影を直接掴んで動かす体験を創出。",
            },
        
            techStack: [
                { category: "使用言語・ライブラリ", details: "C/C++、OpenCV、OpenGL" },
                { category: "ハードウェア・センサー", details: "LiDAR、Kinect v2、LEDパネル" },
                { category: "制作期間・役割", details: "1年・個人開発" },
            ],

            achievements: "WISS第33回インタラクティブシステムとソフトウェアに関するワークショップ デモ発表 <br>チームラボ賞、対話発表賞",

            background: "近年、光と影の相互作用に着目したインタラクション技術やデジタルアートが注目されている。その中でも、影を直接操作することでインタラクションを実現する手法に注目。本来、光源が動くことによって影が変化するが、本研究では、その現象を逆に捉え影自体をインターフェースとして捉え、影に触って直接影を、変形・操作できるインタラクションの可能性を探求。",
            
            architecture:"本システムは、3DCGシミュレーションを用いた「手と影の接触判定」および「手の移動に伴う新たな光源位置の逆算アルゴリズム」の幾何学的な関係を利用している。実空間におけるLEDパネル、対象物体、およびテーブル面の位置関係を、3DCG上の仮想空間として再構築し、以下の手順で計算を行っている。<br><br><img src=\"assets/thumb1.png\" style=\"width: 100%; border-radius: 8px; margin: 1.5rem 0; box-shadow: 0 4px 20px rgba(0,0,0,0.08);\"><br><br>1. タッチ検出と幾何学的な対応付け<br>まず、現在の仮想光源の位置を $\\boldsymbol{p}_{L0}$、2次元LiDARによって取得された現在のテーブル上の手の位置を $\\boldsymbol{p}_{H0}$ と定義する。$\\boldsymbol{p}_{H0}$ がシミュレーション上で生成された影の領域内に存在する場合、システムは「手が影に触れている」と判定。 この接触状態において、手の位置 $\\boldsymbol{p}_{H0}$ と光源位置 $\\boldsymbol{p}_{L0}$ を結ぶ直線を計算し、その直線と仮想物体（virtual object）表面との交点 $\\boldsymbol{p}_{O}$ を導出。これにより、光源、物体上の遮蔽点、そして影の先端にあたる手の位置という3点間の幾何学的な対応関係が確立する。<br><br>2. 手の移動に伴う新たな光源位置の算出<br>次に、ユーザが手（影）をスライドさせ、手が新たな位置 $\\boldsymbol{p}_{H1}$ へ移動したと仮定する。このとき、システムは先ほど求めた物体上の点 $\\boldsymbol{p}_{O}$ による影が $\\boldsymbol{p}_{H1}$ に移動したとみなす。 これに伴う適切な光源の移動先を求めるため、新たな手の位置 $\\boldsymbol{p}_{H1}$ と物体上の点 $\\boldsymbol{p}_{O}$ を結ぶ直線を延長し、仮想LEDパネルとの交点を計算。この交点が、手が $\\boldsymbol{p}_{H1}$ にある状態で影を成立させるための新たな仮想光源の位置 $\\boldsymbol{p}_{L1}$ となる。<br><br>3. リアルタイム制御<br>システムは、光源を $\\boldsymbol{p}_{L1}$ に移動させることで、更新された影が新しい手の位置と一致し続けるように制御。$\\boldsymbol{p}_{H1}$ の取得と $\\boldsymbol{p}_{L1}$ の算出というこの一連のプロセスを連続的かつリアルタイムに反復することにより、ユーザの手の動きに破綻なく追従するインタラクティブな影の操作を実現してる。",

            SystemArchitecture:[
                "**使用技術・システム構成（Tech Stack & Hardware）**",
                "本システムは、ハードウェア群の連携と、C++およびOpenGLを用いたソフトウェア上のリアルタイムシミュレーションによって構築",
                "- 可動式光源: 大型フルカラーLEDパネル（450×253cm）。白い円形を描画し、プログラム制御で自在に移動する光源として活用。",
                "- ハンドトラッキング: 2次元LiDARセンサー。テーブル・床面をスキャンし、ユーザの手の位置を高精度に追跡。",
                "- 空間認識: 3Dカメラ（Kinect V1）。物体の形状（深度データ）を取得し、3Dモデル化。",
            ],
          
            gallery:[
                "assets/thumb1.png",
                "assets/thumb2.png",
                "assets/thumb3.png",
                "assets/thumb4.png"
            ]
        },

        //thumbnail: "assets/thumb1.png",
        //images: ["assets/thumb1.png", "assets/thumb2.png", "assets/thumb3.png"],
        link: "work.html?id=project-1"
    },

    {
        id: "project-2",
        title: "成人式インタラクティブ映像",
        shortDescription: "大人数参加型インタラクティブ映像",
        date: "2025.01",
        client: "愛知県陽明学区二十歳を祝う記念式典",
        content: {
            overview: {
                catchphrase: "会場全体を巻き込む、参加型インタラクティブ映像",
                // demoMedia: "assets/thumb2.png",
                description: "「愛知県陽明学区二十歳を祝う記念式典（成人式）」のオープニングアクトとして、会場の参加者がリアルタイムで映像に干渉できるインタラクティブシステムを企画・開発。単なる映像の視聴ではなく、参加者自身がアクションを起こすことで完成する「体験型コンテンツ」を提供し、式典の一体感と没入感を創出しました。",
            },
            background: "従来の式典映像は受動的な視聴に留まることが多く、参加者の関心を惹きつけきれないという課題がありました。そこで、一生に一度の晴れ舞台において、参加者全員が主体的に楽しめる体験を創出したいと考え、作品を制作しました。",
            techStack: [
                { category: "使用ツール", details: "TouchDesigner,GLSL（システム構築）、Blender,AfterEffects（映像制作）" },
                { category: "ハードウェア・センサー", details: "マイク（Webカメラ）, プロジェクター" },
                { category: "制作期間", details: "1ヶ月" },
            ],
            architecture: {
                description: "会場に設置したマイクに入力された音声をリアルタイムに取得し、音量に応じて映像に花火を打ち上げるシステムを開発。",
                image: ""
            },
            challenges: [
                { task: "大きな動作でのインタラクションができない", solution: "参加者が振袖を着ている状況を想定して拍手などで参加できる音声でのインタラクションを実装しました。" },
                { task: "リアルタイム処理時の描画負荷", solution: "パーティクル処理をコンピュートシェーダー（GLSL）に移行し、GPUで並列処理することで安定したフレームレートを維持し参加者に違和感を与えないようにしました。" }
            ],
            achievements: "約100名の新成人が参加する式典で運用し、好評でした。また、機材トラブルなく安定稼働を実現しました。",
            role: "個人開発（企画、システム設計、実装、現場でのセットアップ・オペレーションまで全工程を担当）",
            links: [
                { label: "GitHubリポジトリ（※一部抜粋）", url: "#" }
            ]
        },
        thumbnail: "assets/thumb2.png",
        images: ["assets/thumb2.png", "assets/thumb3.png"],
        link: "work.html?id=project-2"
    },
    {
        id: "project-3",
        title: "岡崎アートナイトフェスティバルプロジェクションマッピング",
        date: "2022.11",
        client: "岡崎アートナイトフェスティバル",
        content: {
            overview: {
                catchphrase: "歴史的建造物に対するプロジェクションマッピング",
                // demoMedia: "assets/thumb2.png",
                description: "岡崎アートナイトフェスティバルの一環として、岡崎城の大手門を対象としたプロジェクションマッピング映像を制作しました。岡崎城の歴史をテーマに、歴史的建造物の物理的な形状とデジタル映像を融合させた映像作品を制作しました。",
            },
            techStack: {
                title: "使用ツール・期間",
                items: [
                    { category: "使用ツール", details: "AfterEffects" },
                    { category: "ハードウェア", details: "プロジェクター" },
                    { category: "制作期間", details: "1週間" },
                ]
            },
            achievements: {
                title: "展示の反響",
                text: "約200人の観客に楽しんでいただきました。"
            },
            role: {
                title: "担当した役割",
                text: "チーム制作（10名）映像制作を担当"
            },
            links: [
                { label: "映像（一部）", url: "https://youtu.be/EEQYhtfKv90" }
            ]
        },
        thumbnail: "assets/thumb3.png",
        images: ["assets/thumb3.png", "assets/thumb1.png"],
        link: "work.html?id=project-3"
    },
    {
        id: "project-4",
        title: "キューブでポン！",
        shortDescription: "ルービックキューブをインターフェースとした体験型ゲーム作品",
        date: "2022.11",
        client: "Bic Festival（韓国釜山） 2022、東京ゲームショウ2022出展",
        content: {
            overview: {
                catchphrase: "",
                // demoMedia: "assets/thumb2.png",
                description: "",
            },
            techStack: {
                title: "使用ツール・期間",
                items: [
                    { category: "使用ツール", details: "AfterEffects" },
                    { category: "ハードウェア", details: "プロジェクター" },
                    { category: "制作期間", details: "1週間" },
                ]
            },
            achievements: {
                title: "展示の反響",
                text: "約200人の観客に楽しんでいただきました。"
            },
            role: {
                title: "担当した役割",
                text: "チーム制作（10名）映像制作を担当"
            },
            links: [
                { label: "映像（一部）", url: "https://youtu.be/EEQYhtfKv90" }
            ]
        },
        thumbnail: "assets/thumb4.png",
        images: ["assets/thumb4.png", "assets/thumb1.png"],
        link: "work.html?id=project-4"
    },
    {
        id: "project-5",
        title: "乾杯の音頭は破壊から",
        shortDescription: "ビールジョッキをインターフェースにして乾杯をする体験型ゲーム作品",
        date: "2022.11",
        client: "BitSummit2026",
        content: {
            overview: {
                catchphrase: "",
                // demoMedia: "assets/thumb2.png",
                description: "",
            },
            techStack: {
                title: "使用ツール・期間",
                items: [
                    { category: "使用ツール", details: "AfterEffects" },
                    { category: "ハードウェア", details: "プロジェクター" },
                    { category: "制作期間", details: "1週間" },
                ]
            },
            achievements: {
                title: "展示の反響",
                text: "約200人の観客に楽しんでいただきました。"
            },
            role: {
                title: "担当した役割",
                text: "チーム制作（10名）映像制作を担当"
            },
            links: [
                { label: "映像（一部）", url: "https://youtu.be/EEQYhtfKv90" }
            ]
        },
        thumbnail: "assets/thumb4.png",
        images: ["assets/thumb4.png", "assets/thumb1.png"],
        link: "work.html?id=project-5"
    },
    {
        id: "project-6",
        title: "シネマオペレータ",
        shortDescription: "実際の映写機を動かして映画館運営を体験するゲーム作品",
        date: "2022.11",
        client: "BitSummit2026",
        content: {
            overview: {
                catchphrase: "",
                // demoMedia: "assets/thumb2.png",
                description: "",
            },
            techStack: {
                title: "使用ツール・期間",
                items: [
                    { category: "使用ツール", details: "AfterEffects" },
                    { category: "ハードウェア", details: "プロジェクター" },
                    { category: "制作期間", details: "1週間" },
                ]
            },
            achievements: {
                title: "展示の反響",
                text: "約200人の観客に楽しんでいただきました。"
            },
            role: {
                title: "担当した役割",
                text: "チーム制作（10名）映像制作を担当"
            },
            links: [
                { label: "映像（一部）", url: "https://youtu.be/EEQYhtfKv90" }
            ]
        },
        thumbnail: "assets/thumb4.png",
        images: ["assets/thumb4.png", "assets/thumb1.png"],
        link: "work.html?id=project-6"
    },
    {
        id: "project-7",
        title: "ヨガアース",
        shortDescription: "ヨガのポーズを認識して自然を回復させる体験型ゲーム作品",
        date: "2022.11",
        client: "BitSummit2026",
        content: {
            overview: {
                catchphrase: "",
                // demoMedia: "assets/thumb2.png",
                description: "",
            },
            techStack: {
                title: "使用ツール・期間",
                items: [
                    { category: "使用ツール", details: "AfterEffects" },
                    { category: "ハードウェア", details: "プロジェクター" },
                    { category: "制作期間", details: "1週間" },
                ]
            },
            achievements: {
                title: "展示の反響",
                text: "約200人の観客に楽しんでいただきました。"
            },
            role: {
                title: "担当した役割",
                text: "チーム制作（10名）映像制作を担当"
            },
            links: [
                { label: "映像（一部）", url: "https://youtu.be/EEQYhtfKv90" }
            ]
        },
        thumbnail: "assets/thumb4.png",
        images: ["assets/thumb4.png", "assets/thumb1.png"],
        link: "work.html?id=project-4"
    },
    {
        id: "project-8",
        title: "and",
        date: "2024.03",
        client: "and inc.",
        description: "クリエイティブエージェンシー「and」のポートフォリオサイト用オープニングアニメーション。文字と図形が軽快に動き回るタイポグラフィアニメーションを制作。",
        thumbnail: "assets/thumb2.png",
        images: ["assets/thumb2.png"],
        link: "work.html?id=project-8"
    },
    {
        id: "project-9",
        title: "DNP Digital Identity",
        date: "2023.12",
        client: "DNP",
        description: "DNPのデジタルアイデンティティ構想を紹介するコンセプトムービー。デジタル空間における「私」の証明を、透明なオブジェクトの重なりで表現しました。",
        thumbnail: "assets/thumb3.png",
        images: ["assets/thumb3.png"],
        link: "work.html?id=project-9"
    }
];
