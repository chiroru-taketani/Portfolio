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
    gamedesign:"ゲームデザインについて"
};

const portfolioData = [
    {
        id: "project-1",
        title: "ユーザの手の動きに追従する動的な影の制御手法に関する研究",
        shortDescription: "影を操作するインタラクション",
        date: "2025.04",
        client: "卒業論文",
        thumbnail: "assets/works/01/01.png",

        content: {
            gallery: [
                "assets/works/01/01.png",
                "assets/works/01/02.png",
                "assets/works/01/03.png",
                "assets/works/01/04.jpg"
            ],

            overview: {
                catchphrase: "影を操作するインタラクション",
                description: "卒業論文として、影を直接操作するインタラクティブシステムを制作。<br>仮想的なCGの影ではなく、実世界で物体から床に落ちている「現実の影」そのものに触れ、引き伸ばしたり移動させたりできる直感的な操作で影を直接掴んで動かす体験を創出。",
                demoMedia: "assets/works/01/Shadow.mp4"
            },
        
            techStack: [
                { category: "使用言語・ライブラリ", details: "C/C++、OpenCV、OpenGL" },
                { category: "ハードウェア・センサー", details: "LiDAR、Kinect v2、LEDパネル" },
                { category: "制作期間・役割", details: "1年・個人開発" },
                
            ],

            achievements: [
                "WISS第33回インタラクティブシステムとソフトウェアに関するワークショップ デモ発表",
                "チームラボ賞、対話発表賞"
            ],

            background: [
                "近年、光と影の相互作用に着目したインタラクション技術やデジタルアートが注目されている。その中でも、影を直接操作することでインタラクションを実現する手法に注目。本来、光源が動くことによって影が変化するが、本研究では、その現象を逆に捉え影自体をインターフェースとして捉え、影に触って直接影を、変形・操作できるインタラクションの可能性を探求。"
            ],

            SystemArchitecture:[
                "**使用技術・システム構成（Tech Stack & Hardware）**",
                { images: [
                    "assets/works/01/06.jpg",
                    "assets/works/01/07.png"
                ] },
                "本システムは、ハードウェア群の連携と、C++およびOpenGLを用いたソフトウェア上のリアルタイムシミュレーションによって構築",
                "- 可動式光源: 大型フルカラーLEDパネル（450×253cm）。白い円形を描画し、プログラム制御で自在に移動する光源として活用。",
                "- ハンドトラッキング: 2次元LiDARセンサー。テーブル・床面をスキャンし、ユーザの手の位置を高精度に追跡。",
                "- 空間認識: 3Dカメラ（Kinect V1）。物体の形状（深度データ）を取得し、3Dモデル化。",
            ],

            architecture: [
                "本システムは、3DCGシミュレーションを用いた「手と影の接触判定」および「手の移動に伴う新たな光源位置の逆算アルゴリズム」の幾何学的な関係を利用している。実空間におけるLEDパネル、対象物体、およびテーブル面の位置関係を、3DCG上の仮想空間として再構築し、以下の手順で計算を行っている。",
                 { image: "assets/works/01/05.jpg", width: "50%" },
               
                "**1. タッチ検出と幾何学的な対応付け**",
                "まず、現在の仮想光源の位置を $\\boldsymbol{p}_{L0}$、2次元LiDARによって取得された現在のテーブル上の手の位置を $\\boldsymbol{p}_{H0}$ と定義する。$\\boldsymbol{p}_{H0}$ がシミュレーション上で生成された影の領域内に存在する場合、システムは「手が影に触れている」と判定。 この接触状態において、手の位置 $\\boldsymbol{p}_{H0}$ と光源位置 $\\boldsymbol{p}_{L0}$ を結ぶ直線を計算し、その直線と仮想物体（virtual object）表面との交点 $\\boldsymbol{p}_{O}$ を導出。これにより、光源、物体上の遮蔽点、そして影の先端にあたる手の位置という3点間の幾何学的な対応関係が確立する。",
                "**2. 手の移動に伴う新たな光源位置の算出**",
                "次に、ユーザが手（影）をスライドさせ、手が新たな位置 $\\boldsymbol{p}_{H1}$ へ移動したと仮定する。このとき、システムは先ほど求めた物体上の点 $\\boldsymbol{p}_{O}$ による影が $\\boldsymbol{p}_{H1}$ に移動したとみなす。 これに伴う適切な光源の移動先を求めるため、新たな手の位置 $\\boldsymbol{p}_{H1}$ と物体上の点 $\\boldsymbol{p}_{O}$ を結ぶ直線を延長し、仮想LEDパネルとの交点を計算。この交点が、手が $\\boldsymbol{p}_{H1}$ にある状態で影を成立させるための新たな仮想光源の位置 $\\boldsymbol{p}_{L1}$ となる。",
                "**3. リアルタイム制御**",
                "システムは、光源を $\\boldsymbol{p}_{L1}$ に移動させることで、更新された影が新しい手の位置と一致し続けるように制御。$\\boldsymbol{p}_{H1}$ の取得と $\\boldsymbol{p}_{L1}$ の算出というこの一連のプロセスを連続的かつリアルタイムに反復することにより、ユーザの手の動きに破綻なく追従するインタラクティブな影の操作を実現してる。"
            ],
        },
        link: "work.html?id=project-1"
    },

    {
        id: "project-2",
        title: "陽明学区成人式インタラクティブ映像",
        shortDescription: "大人数参加型インタラクティブ映像",
        date: "2025.01",
        client: "大人数参加型インタラクティブ映像",
        thumbnail: "assets/works/02/key.png",
        content: {
            overview: {
                catchphrase: "会場全体を巻き込む、参加型インタラクティブ映像",
                description: "「愛知県陽明学区二十歳を祝う記念式典（成人式）」のオープニングアクトとして、会場の参加者がリアルタイムで映像に干渉できるインタラクティブシステムを企画・開発。単なる映像の視聴ではなく、参加者自身がアクションを起こすことで完成する「体験型コンテンツ」を提供し、式典の一体感と没入感を創出。",
            },
            background: [
                "従来の式典映像は受動的な視聴に留まることが多く、参加者の関心を惹きつけきれないという課題があり。そこで、一生に一度の晴れ舞台において、参加者全員が主体的に楽しめる体験を創出したいと考え、作品を制作。"
            ],
            techStack: [
                { category: "使用ツール", details: "TouchDesigner,GLSL（システム構築）、Blender,AfterEffects（映像制作）" },
                { category: "ハードウェア・センサー", details: "マイク（Webカメラ）, プロジェクター" },
                { category: "制作期間", details: "1ヶ月、個人制作" }
            ],
            architecture: [
                "会場に設置したマイクに入力された音声をリアルタイムに取得し、音量に応じて映像に花火を打ち上げるシステムを開発。プロトタイプ完成の速さやGLSL環境からTouchDesignerを使用して開発"
            ],
            
        
        },
        link: "work.html?id=project-2"
    },
    {
        id: "project-3",
        title: "岡崎アートナイトフェスティバル大手門プロジェクションマッピング",
        shortDescription: "プロジェクションマッピング作品",
        date: "2022.11",
        client: "岡崎アートナイトフェスティバル",
        thumbnail: "assets/works/03/01_key.png",
        images: ["assets/works/03/01_key.png"],
        content: {

            overview: {
                catchphrase: "歴史的建造物に対するプロジェクションマッピング",
                description: "岡崎アートナイトフェスティバルの一環として、岡崎城の大手門を対象としたプロジェクションマッピング映像を制作しました。岡崎城の歴史をテーマに、歴史的建造物の物理的な形状とデジタル映像を融合させた映像作品を制作しました。",
                demoMedia: "assets/works/03/Movie.mov"
            },
            techStack: [
                { category: "使用ツール", details: "AfterEffects" },
                { category: "ハードウェア", details: "プロジェクター" },
                { category: "制作期間", details: "1週間" }
            ],
            achievements: [
                "**展示の反響**",
                "約200人の観客に楽しんでいただきました。"
            ],
            about: [
                "1873年の廃条例によって廃城になった岡崎城の復興を木の成長とに合わせて廃城から復興へ至る力強い生命力を、時間の経過と共に表現。",
                { images: [
                     "assets/works/03/about_01.png", 
                     "assets/works/03/about_02.png"
                ]},
                "日本の伝統的な紋様を随所に散りばめ、岡崎の歴史的背景と繁栄を視覚的に演出",
                {image:"assets/works/03/about_03.png", },
                "伝統と対比させる形でサイバー調のエフェクトを融合させ、未来への進化と躍動感を表現",
                {image:"assets/works/03/about_04.png", }
            ],
        },
        
        link: "work.html?id=project-3"
    },
    {
         id: "project-4",
        title: "キューブでポン！",
        shortDescription: "ルービックキューブをインターフェースにしたゲーム",
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
                description: "「キューブでポン」は、物理的なルービックキューブをインターフェースとして活用し、ルービックキューブができる人もそうでない人も直感的に楽しめるよう設計された、新しい遊び方を提案するパズルゲーム。",
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
                "ビットサミット2023 出展",
                "BIC Festival（韓国） 2024 出展"
            ],

            gamedesign: [
                "本ゲームは、本来は特定のスキルを持つ人に限定されがちなルービックキューブを、誰もが平等に楽しめる直感的なインターフェースへと昇華させることを目指したパズルゲーム。",
                "ルービックキューブは世界共通の普遍的なパズル玩具であるという点に着目し、韓国を含むグローバルな環境でも直感的に理解できる遊びを模索。従来の「同じ色の面を揃える」という難易度の高い遊び方ではなく、「物理的なルービックキューブの面を、ゲーム画面上の指定と揃える」という新しいルールを導入することで、キューブの習熟度に関わらず、すべてのプレイヤーが同じ土俵で楽しめるゲームデザインを実現している。"
            ],

            SystemArchitecture:[
                "このゲームは物理的なルービックキューブの面の色情報の取得が必要である。指定の箱の中にルービックキューブを設置して上面をWebカメラで撮影。撮影した画像をもとにOpenCVでルービックキューブの色を取得。",
                { images: [
                    "assets/works/04/System_01.png",
                    "assets/works/04/System_02.png"
                ] },
                "以下は、OpenCVを用いて特定のキューブの色を判定する処理のソースコードです。",
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
    {
        id: "project-5",
        title: "乾杯の音頭は破壊から",
        shortDescription: "ビールジョッキをインターフェースにして乾杯をする体験型ゲーム作品",
        date: "2022.11",
        client: "BitSummit2026",
        thumbnail: "assets/works/05/key.png",
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
        
        link: "work.html?id=project-5"
    },
    {
        id: "project-6",
        title: "シネマオペレータ",
        shortDescription: "実際の映写機を動かして映画館運営を体験するゲーム作品",
        date: "2022.11",
        client: "BitSummit2025",
        thumbnail: "assets/works/06/key.jpg",
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
        link: "work.html?id=project-6"
    },
];
