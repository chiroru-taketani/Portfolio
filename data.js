// 各セクションのデフォルトの見出し
// ※ここで編集すると全ページに反映されますが、個別の作品ごとに自由なセクション名（キー）を追加することも可能です。
// 例: customSection: { title: "独自のセクション", text: "ここにテキスト..." }
const sectionTitles = {
    overview: "プロジェクトの概要 ",
    background: "開発の背景と目的",
    techStack: "使用技術・開発環境",
    architecture: "システムについて",
    challenges: "技術的な課題と解決策",
    achievements: "実績",
    about: "作品について",
    links: "リンク",
    sourceCode: "ソースコード",
    SystemArchitecture: "システム構成",
    gallery: "ギャラリー",
    gamedesign:"ゲームデザインについて",
    moviedesign:"制作工程",
    arasuji:"あらすじ"
};

const portfolioData = [
    //影
    {
        id: "project-1",
        title: "ユーザの手の動きに追従する動的な影の制御手法に関する研究",
        shortDescription: "影を操作するインタラクション",
        tags: ["研究","インタラクション","個人制作"],
        date: "2025.04",
        client: "卒業研究",
        thumbnail: "assets/works/01/01.png",

        content: {
            gallery: [
                "assets/works/01/01.png",
                "assets/works/01/02.png",
                "assets/works/01/03.png",
                "assets/works/01/04.jpg"
            ],

            overview: {
                catchphrase: "現実の影を直接掴んで動かす、新たなインタラクション体験",
                description: "卒業研究として、実世界における「現実の影」を直接操作するインタラクティブシステムを開発した。<br>仮想的なCGの影ではなく、物体から床に落ちた実際の影に直接触れ、引き伸ばしたり移動させたりする直感的な操作を実現。「影を掴む」という非日常的な体験を創出する。",
                demoMedia: "assets/works/01/Shadow.mp4"
            },
        
            techStack: [
                { category: "使用言語・ライブラリ", details: "C/C++、OpenCV、OpenGL" },
                { category: "ハードウェア・センサー", details: "LiDAR、Kinect v2、大型LEDパネル" },
                { category: "制作期間・役割", details: "1年・個人開発" },
                
            ],

            achievements: [
                "WISS第33回インタラクティブシステムとソフトウェアに関するワークショップ デモ発表",
                "チームラボ賞、対話発表賞 受賞"
            ],

            background: [
                "近年、光と影の相互作用に着目したインタラクション技術やデジタルアートが広く注目を集めている。本研究では、本来「光源が動くことで変化する」受動的な存在である影を、能動的に操作可能なインターフェースとして再定義した。影に直接触れ、変形・操作させることで、デジタルとフィジカルの境界を曖昧にする新たなインタラクションの可能性を探求した。"
            ],

            SystemArchitecture:[
                "**使用技術・システム構成概要（Tech Stack & Hardware）**",
                { images: [
                    "assets/works/01/06.jpg",
                    "assets/works/01/07.png"
                ] },
                "本システムは、ハードウェア群の連携と、C++およびOpenGLを用いたソフトウェア上のリアルタイムシミュレーションによって構築されている。",
                "- **可動式光源**: 大型フルカラーLEDパネル（450×253cm）。白い円形を描画し、プログラム制御によって自在に移動する光源として活用。",
                "- **ハンドトラッキング**: 2次元LiDARセンサー。テーブル・床面をスキャンし、ユーザの手の位置を高精度かつ低遅延で追跡。",
                "- **空間認識**: 3Dカメラ（Kinect v2）。物体の形状（深度データ）を取得し、3Dモデルとして仮想空間に再構築。"
            ],

            architecture: [
                "本システムは、3DCGシミュレーションを用いた「手と影の接触判定」および「手の移動に伴う新たな光源位置の逆算アルゴリズム」に基づいて動作する。実空間におけるLEDパネル、対象物体、テーブル面の位置関係を仮想空間上に再構築し、以下の手順で計算を毎フレーム実行している。",
                 { image: "assets/works/01/05.jpg", width: "50%" },
               
                "**1. タッチ検出と幾何学的な対応付け**",
                "現在の仮想光源位置を $\\boldsymbol{p}_{L0}$、2次元LiDARで取得した手の位置を $\\boldsymbol{p}_{H0}$ とする。$\\boldsymbol{p}_{H0}$ が仮想影の領域内に存在する場合、システムは「手が影に触れた」と判定する。この接触状態において、$\\boldsymbol{p}_{H0}$ と $\\boldsymbol{p}_{L0}$ を結ぶ直線を計算し、仮想物体（virtual object）表面との交点 $\\boldsymbol{p}_{O}$ を導出する。これにより、光源、物体上の遮蔽点、影の先端（手）という3点間の幾何学的対応が確立される。",
                "**2. 光源位置の逆算アルゴリズム**",
                "ユーザが手を新たな位置 $\\boldsymbol{p}_{H1}$ へスライドさせたとする。システムは、先ほど求めた物体上の点 $\\boldsymbol{p}_{O}$ を通過する光線が $\\boldsymbol{p}_{H1}$ に落ちるとみなし、$\\boldsymbol{p}_{H1}$ と $\\boldsymbol{p}_{O}$ を結ぶ直線を延長して仮想LEDパネルとの交点を計算する。この交点が、影を $\\boldsymbol{p}_{H1}$ に成立させるための新たな仮想光源位置 $\\boldsymbol{p}_{L1}$ となる。",
                "**3. リアルタイム制御と追従**",
                "算出した $\\boldsymbol{p}_{L1}$ へ即座に光源を移動させることで、更新された影が新しい手の位置と一致し続けるよう制御する。この取得と逆算のプロセスを極めて低いレイテンシで連続的に反復することにより、ユーザの手の動きに破綻なく追従する動的な影の操作を実現した。"
            ],
            links: [
                {
                    label: "ソースコード：GitHub",
                    url: "https://github.com/chiroru-taketani/shadow_tracking.git"
                }
            ]
        },
        link: "work.html?id=project-1"
    },

    //成人式
    {
        id: "project-2",
        title: "陽明学区成人式インタラクティブ映像",
        shortDescription: "大人数参加型インタラクティブ映像",
        tags: ["映像作品","インタラクション","個人制作"],
        date: "2025.01",
        client: "大人数参加型インタラクティブ映像",
        thumbnail: "assets/works/02/key.png",
        content: {
            gallery: [
                "assets/works/02/key.png",
                "assets/works/02/gallery_01.png",
                "assets/works/02/gallery_02.png",
                "assets/works/02/gallery_03.png",
            ],

            overview: {
                catchphrase: "会場全体を巻き込む、参加型インタラクティブ映像",
                description: "「愛知県陽明学区二十歳を祝う記念式典（成人式）」のオープニングアクトとして、会場の参加者がリアルタイムで映像に干渉できるインタラクティブシステムを企画・開発した。単なる受動的な映像視聴ではなく、参加者自身がアクションを起こすことで完成する「体験型コンテンツ」を提供し、式典における一体感と没入感を創出した。",
            },
            background: [
                "従来の式典映像は受動的な視聴に留まることが多く、参加者の関心を十分に惹きつけきれないという課題が存在した。そこで、一生に一度の晴れ舞台において、参加者全員が主体的に楽しめる体験を創出したいと考え、本作品の制作に至った。"
            ],
            techStack: [
                { category: "使用ツール", details: "TouchDesigner, GLSL（システム構築）、Blender, AfterEffects（映像制作）" },
                { category: "ハードウェア・センサー", details: "マイク（Webカメラ）, プロジェクター" },
                { category: "制作期間", details: "1ヶ月、個人制作" }
            ],
            architecture: [
                "会場に設置したマイクから入力される音声をリアルタイムに取得し、その音量に応じて映像内に花火を打ち上げるシステムを開発した。プロトタイプ構築の迅速さや、GLSLの実装が容易であるという理由から、開発環境にはTouchDesignerを採用している。",
                { images: [
                    "assets/works/02/shystem.png",
                ] },
            ],
            
        
        },
        link: "work.html?id=project-2"
    },

    //アートナイトフェスティバル
    {
        id: "project-3",
        title: "岡崎アートナイトフェスティバル大手門プロジェクションマッピング",
        shortDescription: "プロジェクションマッピング作品",
        tags: ["映像作品","プロジェクションマッピング","チーム制作"],
        date: "2022.11",
        client: "岡崎アートナイトフェスティバル",
        thumbnail: "assets/works/03/01_key.png",
        images: ["assets/works/03/01_key.png"],
        content: {

            overview: {
                catchphrase: "歴史的建造物に対するプロジェクションマッピング",
                description: "岡崎アートナイトフェスティバルの一環として、岡崎城の大手門を対象としたプロジェクションマッピング映像を制作した。岡崎城の歴史をテーマに、歴史的建造物の物理的な形状とデジタル映像を融合させた映像作品である。",
                demoMedia: "assets/works/03/Movie.mov"
            },
            techStack: [
                { category: "使用ツール", details: "AfterEffects" },
                { category: "ハードウェア", details: "プロジェクター" },
                { category: "制作期間", details: "1週間" }
            ],
            achievements: [
                "**展示の反響**",
                "約200人の観客を動員し、高い評価を獲得した。"
            ],
            about: [
                "1873年の廃城令によって取り壊された岡崎城の復興を、樹木の成長と重ね合わせることで、廃城から復興へ至る力強い生命力を時間の経過と共に表現した。",
                { images: [
                     "assets/works/03/about_01.png", 
                     "assets/works/03/about_02.png"
                ]},
                "日本の伝統的な紋様を随所に散りばめ、岡崎の歴史的背景と繁栄を視覚的に演出した。",
                {image:"assets/works/03/about_03.png", },
                "伝統と対比させる形でサイバー調のエフェクトを融合させ、未来への進化と躍動感を表現した。",
                {image:"assets/works/03/about_04.png", }
            ],
        },
        
        link: "work.html?id=project-3"
    },

    //キューブでポン
    {
         id: "project-4",
        title: "キューブでポン！",
        shortDescription: "ルービックキューブをインターフェースにしたゲーム",
        tags: ["ゲーム", "インタラクション", "デバイス制作","チーム制作"],
        date: "2023.10",
        client: "ゲーム作品",
        thumbnail: "assets/works/04/key.jpeg",

        content: {
            gallery: [
                "assets/works/04/gallery_01.jpeg",
                "assets/works/04/gallery_02.jpg",
                "assets/works/04/gallery_03.jpeg",
                "assets/works/04/gallery_04.jpg"
            ],

            overview: {
                catchphrase: "ルービックキューブをインターフェースに",
                description: "「キューブでポン」は、物理的なルービックキューブをインターフェースとして活用し、ルービックキューブができる人もそうでない人も直感的に楽しめるよう設計された、新しい遊び方を提案するパズルゲームである。",
                demoMedia: "assets/works/04/movie.mp4"
            },
        
            techStack: [
                { category: "使用言語・ライブラリ", details: "C++、OpenCV、Unity（C#）" },
                { category: "ハードウェア・センサー", details: "Webカメラ" },
                { category: "制作期間・役割", details: "６ヶ月・チーム開発（６人）・ゲームデザイン、センサリングを担当" },
                
            ],

            achievements: [
                "東京ゲームショウ 2023 出展",
                "ゲームマーケット東京 2023 出展",
                "BitSummit 2023 出展",
                "BIC Festival（韓国） 2024 出展"
            ],

            gamedesign: [
                "本ゲームは、本来特定のスキルを持つ人に限定されがちなルービックキューブを、誰もが平等に楽しめる直感的なインターフェースへと昇華させることを目指したパズルゲームである。",
                "ルービックキューブは世界共通の普遍的なパズル玩具であるという点に着目し、グローバルな環境でも直感的に理解できる遊びを模索した。従来の「同じ色の面を揃える」という難易度の高い遊び方ではなく、「物理的なルービックキューブの面を、ゲーム画面上の指定と揃える」という新しいルールを導入。これにより、キューブの習熟度に関わらず、すべてのプレイヤーが同じ土俵で楽しめるゲームデザインを実現している。"
            ],

            SystemArchitecture:[
                "本ゲームでは、物理的なルービックキューブの面の色情報をリアルタイムに取得する必要がある。指定の箱の中にルービックキューブを設置し、上面をWebカメラで撮影。撮影した画像をもとにOpenCVを用いた画像処理を行い、ルービックキューブの色情報を抽出している。",
                { images: [
                    "assets/works/04/System_01.png",
                    "assets/works/04/System_02.png"
                ] },
                "以下は、OpenCVを用いて特定のキューブの色を判定する処理のソースコードである。",
                {code: `#include <stdio.h>
#include <string>
#include <stdlib.h>
#include <fstream> //ファイル関連
#include <sstream> //ファイル関連
#include <iostream>  //入出力関連ヘッダ
#include <opencv2/opencv.hpp>  //OpenCV関連ヘッダ

void mouseCV(int event, int x, int y, int flg, void *param); //マウスイベントコールバック関数
cv::Mat hsvImage;  //HSV用

int main (int argc, const char* argv[]) {

    int number1 = 0, number2 = 0;
    int count = 0;
    int cubecol[][3]={{-1,-1,-1},{-1,-1,-1},{-1,-1,-1}}; //色認識の数字配列

    cv::Vec3b cCol[6];
    cv::Rect boxarea = cv::Rect(380, 90, 430, 430); //取得範囲(x座標、y座標、幅、高さ)

    //認識した輪郭の色を定義
    cCol[0][0] = 0; cCol[0][1] = 0; cCol[0][2] = 255; //赤の識別(0)
    cCol[1][0] = 255; cCol[1][1] = 0; cCol[1][2] = 0; //青の識別(1)
    cCol[2][0] = 0; cCol[2][1] = 255; cCol[2][2] = 0; //緑の識別(2)
    cCol[3][0] = 0; cCol[3][1] = 255; cCol[3][2] = 255; //黄の識別(3)
    cCol[4][0] = 0; cCol[4][1] = 128; cCol[4][2] = 255; //橙の識別(4)
    cCol[5][0] = 255; cCol[5][1] = 255; cCol[5][2] = 255; //白の識別(5)

    //カメラの初期化
    cv::VideoCapture capture(0);  //カメラ1番をオープン（webカメラを開くときは1,内蔵を開くときは2）
    if (capture.isOpened()==0) {  //オープン失敗
        printf("Camera not found\n");
        return -1;
    }

    capture.set(cv::CAP_PROP_AUTO_EXPOSURE, 0.75);

    //画像格納用インスタンス準備
    int width = 1280, height = 720;  //処理画像サイズ
    cv::Mat captureImage;  //キャプチャ用
    cv::Mat frameImage = cv::Mat(cv::Size(width, height), CV_8UC3);  //処理用
    cv::Mat grayImage[6]; //grayImageを格納する配列を定義

    for (int i=0; i<6; i++) {
        grayImage[i] = cv::Mat(cv::Size(width, height), CV_8UC1);  //領域用
    }

    //ウィンドウの生成と移動
    cv::namedWindow("Frame");
    cv::moveWindow("Frame", 0, 0);

    //HSV取得の関数を呼び出し
    cv::setMouseCallback("Frame", mouseCV, 0);

    cv::Mat priorImage(cv::Size(width, height), CV_8UC1);  //前フレーム画像
    cv::Mat presentImage(cv::Size(width, height), CV_8UC1);  //現フレーム画像
    cv::TermCriteria criteria = cv::TermCriteria(cv::TermCriteria::MAX_ITER|cv::TermCriteria::EPS, 20, 0.05);  //反復アルゴリズム停止基準
    std::vector<cv::Point2f> priorFeature, presentFeature;  //前フレームおよび現フレーム特徴点
    std::vector<unsigned char> status;  //作業用
    std::vector<float> errors;  //作業用

    //動画像処理無限ループ
    while (1) {

        capture.set(cv::CAP_PROP_AUTO_EXPOSURE, 0.75);

        //カメラから1フレーム読み込んでcaptureImageに格納（CV_8UC3）
        capture >> captureImage;
        if (captureImage.data==0) break;  //フレームの取り込みに失敗したら無限ループ脱出

        //captureImageをframeImageに合わせてサイズ変換して格納
        cv::resize(captureImage, frameImage, frameImage.size());
        cv::flip(frameImage, frameImage, -1);

        //メディアンフィルタ適用
        cv::medianBlur(frameImage, frameImage, 3);

        //=============
        cv::cvtColor(frameImage, presentImage, cv::COLOR_BGR2GRAY); //画像を2値化画像に変換
        cv::goodFeaturesToTrack(priorImage, priorFeature, 300, 0.01, 10); //前フレームの画像から顕著なコーナー（特徴点）を検出した画像
        int opCnt = priorFeature.size();  //特徴点数
        double optLen = 0.0; 
        if (opCnt>0) {  //特徴点が存在する場合
            //前フレームの特徴点"priorFeature"から，対応する現フレームの特徴点"presentFeature"を検出
            cv::calcOpticalFlowPyrLK(priorImage, presentImage, priorFeature, presentFeature, status, errors, cv::Size(10,10), 4, criteria);
            //オプティカルフロー描画 (画像内の特徴点の移動を検出)
            for(int i=0; i<opCnt; i++){
                cv::Point pt1 = cv::Point(priorFeature[i]);  //前フレーム特徴点
                cv::Point pt2 = cv::Point(presentFeature[i]);  //現フレーム特徴点

                double len0 = sqrt(pow(pt1.x-pt2.x,2)+pow(pt1.y-pt2.y,2)); //前フレームの特徴点と現フレームの特徴点の移動距離を計算
                if (len0<200) { //移動距離の閾値が200より大きいとき
                    //cv::line(frameImage, pt1, pt2, CV_RGB(255, 0, 0), 1, 8);  //直線描画
                    optLen += len0; //前フレームと現フレームの移動距離を加算
                }
            }
        }
        presentImage.copyTo(priorImage);

        //色変換
        cv::cvtColor(frameImage, hsvImage, cv::COLOR_BGR2HSV);

        for (int i=0; i<6; i++) {
            grayImage[i] = 0;  //grayImageのリセット
        }

        for (int j=0; j<hsvImage.rows; j++) { //720
            for (int i=0; i<hsvImage.cols; i++) { //1280
                if(i<boxarea.x || i>boxarea.x+boxarea.width || j<boxarea.y || j>boxarea.y+boxarea.height) continue;
                cv::Vec3b s = hsvImage.at<cv::Vec3b>(j,i);  //hsvImageの画素(i,j)の画素値をsに格納

                //s[0]：色相（0~179）H
                //s[1]：彩度（0~255）S
                //s[2]：明度（0~255）V
                // HとVの調整が多い

                //赤の識別(0)
                if (((s[0]<6|| s[0]>160) && s[1]>65 && (s[2]>90))){
                    grayImage[0].at<unsigned char>(j,i) = 255;
                }
                //橙の識別(4)
                else if ((s[0]>=10 && s[0]<20) && s[1]>110 && s[2]>145) {
                    grayImage[4].at<unsigned char>(j,i) = 255;
                }
                //青の識別(1)
                else if ((s[0]>97 && s[0]<120) && (s[1]>120) && (s[2]>100)) {
                    grayImage[1].at<unsigned char>(j,i) = 255;
                }
                //緑の識別(2)
                else if ((s[0]>60 && s[0]<80) && s[1]>90 && s[2]>120) {
                    grayImage[2].at<unsigned char>(j,i) = 255;
                }
                //黄の識別(3)
                else if ((s[0]>=30&& s[0]<=40) && s[1]>30 && s[2]>170) {
                    grayImage[3].at<unsigned char>(j,i) = 255;
                }
                //白の識別(5)
                else if (s[0]< 160 && s[1]<80 && s[2]>180) {
                    grayImage[5].at<unsigned char>(j,i) = 255;
                }

            }
        }

        if (optLen<2000) { //前フレームと現フレームの移動距離が2000より大きいとき
            for (int i=0; i<6; i++) {
                cv::dilate(grayImage[i], grayImage[i], cv::Mat(), cv::Point(-1,-1), 1);  //領域膨張
                // cv::erode(grayImage, grayImage, cv::Mat(), cv::Point(-1,-1), 1);  //領域収縮

                std::vector< std::vector<cv::Point> > contours;  //領域輪郭用
                cv::findContours(grayImage[i], contours, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_NONE);  //領域輪郭抽出

                //system("clear");
                for (int j=0; j<contours.size(); j++) {
                    double area = cv::contourArea(contours[j]);
                    double length = cv::arcLength(contours[j], true);
                    double cir = 4.0 * M_PI * area / (length * length);
                    if (area<1000 || area > 50000 || cir < 0.1) continue;
                    //printf("%f\n", area);

                    cv::drawContours(frameImage, contours, j, cv::Scalar(cCol[i][0],cCol[i][1],cCol[i][2]), 2, 8);  //領域輪郭描画

                    cv::Point cPoint = (contours[j][0]+contours[j][contours[j].size()/2])/2;
                    cv::circle(frameImage, cPoint, 3, cv::Scalar(255,255,0), -1);
                    if (cPoint.y > boxarea.y && cPoint.y < boxarea.y+boxarea.height/3){ //1行目
                        if (cPoint.x > boxarea.x && cPoint.x < boxarea.x+boxarea.width/3){
                            cubecol[0][0] = i;
                        }
                        else if (cPoint.x > boxarea.x+boxarea.width/3 && cPoint.x < boxarea.x+2*boxarea.width/3){
                            cubecol[0][1] = i;
                        }
                        else if (cPoint.x > boxarea.x+2*boxarea.width/3 && cPoint.x < boxarea.x+boxarea.width){
                            cubecol[0][2] = i;
                        }
                    }
                    else if (cPoint.y > boxarea.y+boxarea.height/3 && cPoint.y < boxarea.y+2*boxarea.height/3){ //2行目
                        if (cPoint.x > boxarea.x && cPoint.x < boxarea.x+boxarea.width/3){
                            cubecol[1][0] = i;
                        }
                        else if (cPoint.x > boxarea.x+boxarea.width/3 && cPoint.x < boxarea.x+2*boxarea.width/3){
                            cubecol[1][1] = i;
                        }
                        else if (cPoint.x > boxarea.x+2*boxarea.width/3 && cPoint.x < boxarea.x+boxarea.width){
                            cubecol[1][2] = i;
                        }
                    }
                    else if (cPoint.y > boxarea.y+2*boxarea.height/3 && cPoint.y < boxarea.y+boxarea.height){ //3行目
                        if (cPoint.x > boxarea.x && cPoint.x < boxarea.x+boxarea.width/3){
                            cubecol[2][0] = i;
                        }
                        else if (cPoint.x > boxarea.x+boxarea.width/3 && cPoint.x < boxarea.x+2*boxarea.width/3){
                            cubecol[2][1] = i;
                        }
                        else if (cPoint.x > boxarea.x+2*boxarea.width/3 && cPoint.x < boxarea.x+boxarea.width){
                            cubecol[2][2] = i;
                        }
                    }
                    
                }
            }
        }

        cv::rectangle(frameImage, boxarea, cv::Scalar(255, 255, 0), 2); //フレーム内に四角形を表示

        //ウィンドウへの画像の表示
        cv::imshow("Frame", frameImage);

       system("clear");
       for (int j = 0; j<3; j++){
           printf("%d %d %d\n", cubecol[j][0], cubecol[j][1], cubecol[j][2]);
       }

        using std::endl; //名前空間の定義
        using std::ofstream;

        ofstream ofs("");  // ファイルパスを指定
        for (int k=0; k<3; k++){
            for (int f = 0; f<3; f++){
                ofs << cubecol[k][f] << endl;
            }
        }

        //キー入力待ち
        char key = cv::waitKey(20);  //20ミリ秒キー入力待ち
        if (key=='q') break;  //入力されたキーが[q]なら無限ループ脱出
    }

    return 0;
}

void mouseCV(int event, int x, int y, int flg, void *param)//マウスが押されたときに呼び出される関数
{
    if (event==cv::EVENT_LBUTTONDOWN) { //マウスの左ボタンが押されたとき
        cv::Vec3b s = hsvImage.at<cv::Vec3b>(y,x);
        printf("(H, S, V) = (%d, %d, %d)\n", s[0], s[1], s[2]);
    }
}`,
                    language: "cpp",
                    filename: "ImageProcessing.cpp"
                }
            ],
            

        },
        link: "work.html?id=project-4"
    },

    //乾杯の音頭は破壊から
    {
        id: "project-5",
        title: "乾杯の音頭は破壊から",
        shortDescription: "ビールジョッキをインターフェースにして乾杯をする体験型ゲーム作品",
        tags: ["ゲーム", "インタラクション", "デバイス制作","チーム制作"],
        date: "2026.11",
        client: "BitSummit2026",
        thumbnail: "assets/works/05/key.png",
        content: {
            gallery: [
                "assets/works/05/gallery_01.jpeg",
                "assets/works/05/gallery_02.jpg",
                "assets/works/05/gallery_03.jpg",
                "assets/works/05/gallery_04.jpg"
            ],

            overview: {
                catchphrase: "「乾杯」という日常の楽しいアクションを遊びに昇華させた体感型リズムゲーム",
                description: "「乾杯の音頭は破壊から」はビールジョッキをコントローラーに見立て、タイミングよくジョッキ同士をぶつける体感型ゲームである。本作の最大のこだわりは「見ている人も楽しめる」点にある。ゲームの動作を極限まで単純化することで、誰もが直感的に遊べるゲームデザインを実現した。",
                demoMedia: "assets/works/05/movie.MP4"
            },
        
            techStack: [
                { category: "使用言語・ライブラリ", details: "C++、Unity（C#)" },
                { category: "ハードウェア・センサー", details: "M5Stick" },
                { category: "制作期間・役割", details: "4ヶ月・チーム開発（6人）・ゲームデザイン、センサリングを担当" },
                
            ],

            achievements: [
                "BitSummit 2026 出展",
            ],

            gamedesign: [
                "**「第三者から見ても面白い」をコンセプトに設計**",
                "誰もが知っている「乾杯」という分かりやすいアクションをベースに、ゲームならではの意外性ある展開を掛け合わせることで、プレイヤーの動きそのものがパフォーマンスになるようデザインした。",
                "また、デジタルなボタン操作を完全に排除し、「ジョッキをぶつける」というワンアクションのみでゲームの全てが完結する直感的なシステムを採用している。これにより、プレイヤーはコントローラーを操作している感覚を抱くことなく、乾杯の動作に純粋に集中して楽しむことができる。"
            ],

            SystemArchitecture:[
                "本ゲームでは、ジョッキ同士をぶつけた際の衝突判定を取得する必要がある。プレイヤーのアクションを受け止めるデバイスとして、専用の「台座付きジョッキ」を制作した。",
                { image: "assets/works/05/System_01.png", width: "40%"},
                "台座部分にはバネ機構を採用しており、ジョッキ同士がぶつかると物理的に沈み込む（伸びる）よう設計している。これにより、勢いよく乾杯した際の衝撃を吸収しつつ、プレイヤーに確かな物理的フィードバックを与える。",
                "さらに、衝突判定には台座内部に組み込んだマイコン「M5Stick」を活用している。バネが伸縮した際の動きをM5Stick内蔵の加速度センサーで検知し、そのデータをリアルタイムにゲームシステム側へ送信することで、完全ボタンレスの直感的な入力を実現した。",
                { images:["assets/works/05/System_02.png",
                     "assets/works/05/System_03.png"
                ] }
            
                
            ],
            

        },
        
        link: "work.html?id=project-5"
    },

    //シネマオペレータ
    {
        id: "project-6",
        title: "シネマオペレータ",
        shortDescription: "実際の映写機を動かして映画館運営を体験するゲーム作品",
        tags: ["ゲーム", "インタラクション", "デバイス制作","チーム制作"],
        date: "2025.8",
        client: "BitSummit2025",
        thumbnail: "assets/works/06/key.jpg",
        content: {
            gallery: [
                "assets/works/06/gallery_01.png",
                "assets/works/06/gallery_02.png",
                 "assets/works/06/gallery_03.png",
                 "assets/works/06/gallery_04.png"
            ],

            overview: {
                catchphrase: "プレイヤーが映画館の映写技師となり、実際の映写機を操作して上映を成功に導くシミュレーションゲーム",
                description: "「シネマオペレータ」は実際の映写機をコントローラーとして操作するゲームである。実際の映写機の複雑なギミックや操作手順をゲームシステムに落とし込み、本物さながらの操作感を再現することにこだわって開発した。",
                demoMedia: "https://youtu.be/NUyNLEWDQ4E?si=tUy1AXMcvB-nZWiX"
            },
        
            techStack: [
                { category: "使用言語・ライブラリ", details: "C++、Unity（C#)" },
                { category: "ハードウェア・センサー", details: "M5Stack FIRE、M5Stick、M5Stack ATOMS3R" },
                { category: "制作期間・役割", details: "3ヶ月・チーム開発（6人）・ゲームデザイン、センサリングを担当" },
                
            ],

            achievements: [
                "デジゲー博 2025 出展",
                "BitSummit 2026 出展"
            ],

            gamedesign: [
                "**「実機の映写機を使った直感的な操作体験」をコンセプトに設計**",
                "プレイヤーの体験を最優先に考え、単に実機を使うだけでなく「ゲームとしての遊びやすさ」と「アナログ機器のリアリティ」のバランスを追求した。フィルム装填の手順はゲーム向けに最適化（簡易化）する一方で、操作の要となるノブは最小限の改造に留め、機器本来が持つ「操作時の重みや抵抗感」を意図的に残している。",
                "また、メニュー画面でのデジタルなボタン選択を廃止し、物理的なディスクを直接交換することで上映映画を切り替えるという、直感的かつアナログなUIを採用した。"
            ],

            SystemArchitecture:[
                "本ゲームでは、プレイヤーによる各ノブの操作量と、セットされたフィルムの種類を正確に認識する必要がある。そこで、物理的な映写機の操作をデジタル空間へシームレスに反映させるシステムを独自に開発した。",
                { image: "assets/works/06/System_01.png"},
                "入力側では、上映フィルムに見立てた色分けディスクをカラーセンサーで読み取ることで、再生すべき作品データを特定している。",
                { images:["assets/works/06/System_02.png",
                     "assets/works/06/System_03.jpg"
                ] } ,
                "また、操作の要となるノブ部分には「M5Stack ATOM」を2個組み込み、内蔵の傾きセンサーを利用してプレイヤーの回転操作を精密に取得している。",
                "これらのハードウェア群から得られたセンサー値はリアルタイムにUnityへ送信され、ゲーム内の映像描画や進行処理へ即座に反映される仕組みとなっている。"            
            ]
        },
        link: "work.html?id=project-6"
    },

    //中村選手PV
    {
        id: "project-7",
        title: "中村優斗選手プロモーションビデオ",
        shortDescription: "ドローン映像とCGを組み合わせた映像作品",
        tags: ["映像作品","PV", "実写合成","チーム制作"],
        date: "2024.11",
        client: "中村選手PV",
        thumbnail: "assets/works/07/key.png",
        content: {

            overview: {
                catchphrase: "東京ヤクルトスワローズ・中村優斗選手のPV制作プロジェクト",
                description: "本作品は、東京ヤクルトスワローズに入団した中村優斗選手のプロデビューに際し、「選手自身の魅力や、これからの活躍への期待を多くの人に伝えたい」という思いから企画・制作したプロモーションビデオである。<br>1ヶ月という短い制作期間のなか、7人体制のチームでプロジェクトに挑み、自身は映像のスケール感と視覚的なメッセージ性を担う「VFX（3D合成）」および「ドローン空撮」を担当した。",
                demoMedia: "https://youtu.be/IKl_3tKA-mA?si=Jigh9BetNyAejiS_"
            },
        
            techStack: [
                { category: "使用ツール", details: "AfterEffects（コンポジット）、Blender（3Dアニメーション制作）" },
                { category: "制作期間・役割", details: "1ヶ月・チーム制作（7名）・合成シーン全般、ドローン撮影" },
                
            ],


            moviedesign: [
                "ドローンを用いて実写素材を撮影し、そこにBlenderで作成した3Dモデルを合成するVFXカットを制作した。",
                "チームの象徴である「燕（ツバメ）」をBlenderでモデリングしアニメーションを付けることで、プロの世界へ羽ばたいていく中村選手の「躍進への希望」と重ね合わせた演出を行っている。",
                { images:["assets/works/07/CG_01.png",
                     "assets/works/07/CG_02.png"
                ] } ,
                { images:["assets/works/07/rend_01.png",
                     "assets/works/07/rend_02.png"
                ] } 
            ],

           
        },
        link: "work.html?id=project-7"
    },

    //こえかけさん
    {
        id: "project-8",
        title: "こえかけさん",
        shortDescription: "オリジナルVFXホラー映像作品",
        tags: ["映像作品", "実写合成", "個人制作"],
        date: "2024.11",
        client: "オリジナルVFXホラー映像作品",
        thumbnail: "assets/works/08/key.png",
        content: {

            overview: {
                catchphrase: "VFXを使ったオリジナルホラー作品",
                description: "VFX（3D合成）を用いた約4分間のオリジナル短編ホラー作品である。BlenderとAfter Effectsを使用し、実写映像と3Dアニメーションをシームレスに融合させた演出を行っている。", 
                demoMedia:"https://youtu.be/Lc0XG4H2i4o?si=bQwKAYDfEOnnkuRz"
            },
            arasuji:[
                "あらすじ",
                "声をかけられると襲われるという都市伝説上の怪異、「こえかけさん」。ある日、主人公は友人からこえかけさんと同じ言葉をかけられてしまう。その直後から、帰宅中の背後に得体の知れない気配を感じるようになる主人公。なんとか家まで逃げ切り、安心したのも束の間、そこには逃れられない恐怖が迫っていた。"
            ],
        
            techStack: [
                { category: "使用ツール", details: "AfterEffects（コンポジット）、Blender（3Dアニメーション制作）" },
                { category: "制作期間・役割", details: "1ヶ月・個人制作" },
                
            ],


            moviedesign: [
                "**撮影・画作り：不穏な空気感の演出**",
                "日常が徐々に非日常へと侵食されていくホラー特有の不穏な空気感を表現するため、撮影時の構図や色彩に強くこだわった。",
                "- **Log撮影による色彩表現**: 映像全体をLog撮影で収録し、あえて彩度を落とした「色が抜けたような」カラーグレーディングを施すことで、冷たく無機質で不気味な世界観を構築した。",
                "- **シンメトリーを意識した構図**: 画面構成において「シンメトリー（左右対称）」を強く意識して撮影した。整然とした規則的な構図を多用することで、そこに異物（怪異）が入り込んだ際の違和感や異様さを視覚的に際立たせている。",
                { images:["assets/works/08/rend_01.png",
                     "assets/works/08/rend_02.png"
                ] } ,
                "**3DCG・VFX：現実世界への浸食**",
                "- **怪異のモデリング（Blender）**: 恐怖の対象となる怪異は、Blenderを用いてフルスクラッチでモデリングを行った。人間らしさと異形が混ざり合った、本能的な不気味さを感じさせる造形を目指した。",
                "- **実写とのコンポジット（After Effects）**: 作成した3DモデルをAfter Effectsで実写の背景映像と合成した。ライティングや影の落ち方、レンズの歪みなどを現実の空間と精密に馴染ませることで、日常空間に怪異が実在するかのようなリアリティを追求している。",
                { images:["assets/works/08/rend_03.png",
                     "assets/works/08/rend_04.png"
                ] } ,
            ],

           
        },
        link: "work.html?id=project-8"
    },

    //14号館プロジェクト
    {
        id: "project-9",
        title: "学校紹介プロジェクションマッピング映像",
        shortDescription: "4画面プロジェクションマッピング映像",
        tags: ["映像作品","プロジェクションマッピング", "チーム制作"],
        date: "2023.4",
        client: "4画面プロジェクションマッピング映像",
        thumbnail: "assets/works/09/key.png",
        content: {
            gallery: [
                "assets/works/09/rend_01.png",
                "assets/works/09/rend_02.png",
                 "assets/works/09/rend_03.png",
                 "assets/works/09/rend_04.png"
            ],
            overview: {
                catchphrase: "4面（前方、左右、床面）を活用した空間没入型映像",
                description: "愛知工業大学（AIT）のオープンキャンパスに向け、新入生に大学の魅力を伝えるために制作したプロジェクションマッピングコンテンツである。<br>本プロジェクトにおいて、企画・監督・撮影、および3D制作を担当した。単なるスクリーンでの映像上映に留まらず、空間全体（4面）に映像を投影することで、来場者が「まるでキャンパス内をドローンに乗って空を飛んでいるような」没入感のある疑似体験ができる空間を作り上げた。", 
                demoMedia:"https://youtu.be/8Zsg0hgMN2s?si=QJZ840M49RpF8aq9"
            },
        
            techStack: [
                { category: "使用ツール", details: "AfterEffects（コンポジット）、Blender（3Dアニメーション制作）、OpenCV（投影システム）" },
                { category: "制作期間・役割", details: "1ヶ月・チーム制作5人（監督・撮影・3D制作・システム構築を担当）" },
                
            ],


            moviedesign: [
                "**こだわり**",
                "単なる映像視聴ではなく「空を飛んでいる感覚」を全身で味わってもらうため、撮影手法と投影システムの工夫に強くこだわった。",
                "- **撮影の工夫**: 一定の速度と高度を厳密に保ちながら、ドローンを用いて同一のコースを4回（前方・左側方・右側方・下方）に分けて撮影した。",
                "- **同期システムの開発**: 4方向の映像がわずかでもズレると没入感が削がれてしまうため、OpenCVを用いて4台のプロジェクターを完全に同期再生する専用プログラムを開発した。技術的なアプローチによって、体験のクオリティを底上げしている。",
                { images:["assets/works/09/key.png",
                    //  "assets/works/09/rend_02.png"
                ] } ,
            ],

           
        },
        link: "work.html?id=project-9"
    },

    

    

    
];
