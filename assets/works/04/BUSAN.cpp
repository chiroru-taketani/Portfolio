//g++ -O3 BUSAN.cpp -std=c++11 `pkg-config --cflags --libs opencv4`
#include <stdio.h>
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
                    //printf("%d, %d\n", cPoint.x, cPoint.y);
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

/*変更点*/
        ofstream ofs("/Users/k22026kk/Desktop/test.txt");  // ファイルパスを指定する
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
}
