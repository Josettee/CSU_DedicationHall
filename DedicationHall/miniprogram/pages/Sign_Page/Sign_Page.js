//index.js
//获取应用实例
const app = getApp()
 
Page({
  data: {
    context: null,
    index: 0,
    height: 0,
    width: 0,
    ifhidden: '',
    BGI:'https://s1.ax1x.com/2023/04/12/ppXAqlq.png',
    ifsigned:0,
  },
  /**记录开始点 */
  bindtouchstart: function(e) {
    this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    this.setData({
      ifhidden:'hidden',
      BGI:'https://s1.ax1x.com/2023/04/09/ppbuMAe.png',
      ifsigned:1,
    })
  },
  /**记录移动点，刷新绘制 */
  bindtouchmove: function(e) {
    this.data.context.setStrokeStyle('#000000');
    this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
    this.data.context.stroke();
    this.data.context.draw(true);
    this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
  },
  

  bindtouchend: function(e) {
    this.setData({
      ifhidden:''
    })
  },
  /**清空画布 */
  clear: function() {
    this.data.context.clearRect(0, 0, this.data.width, this.data.height);
    this.data.context.draw();
    this.data.context.setStrokeStyle('#000000')
    this.data.context.setLineWidth(2)
    this.data.context.setFontSize(20)
    this.data.context.draw()
    this.setData({
      BGI:'https://s1.ax1x.com/2023/04/12/ppXAqlq.png',
      ifsigned:0,
    })
  },

  submit: function(){
    wx.showModal({
      title: '提示',
      content: '是否确认提交？',
      success:  (res) => {
        if (res.confirm) {//点击了确定
          if(this.data.ifsigned==0){
            wx.showToast({
              title: '你还未签字',
              icon: 'none',
              duration: 2000
            })
          }
          else{
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.reLaunch({
              url: '../END/END'
            })
          }
        } else {//点击取消
          this.clear()
        }
      }
    })
    /*wx.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: 'firstCanvas',
      success(res) {
        console.log(res.tempFilePath)
      }
    })*/
  },

  /**导出图片 */
  onLoad: function() {
    this.setData({
      width : wx.getSystemInfoSync().screenWidth,
      height : wx.getSystemInfoSync().screenHeight,
    })
    console.log(this.width);
    console.log(this.height);
  },
  onShow: function() {
    let query = wx.createSelectorQuery();
    const that = this;
    query.select('#firstCanvas').boundingClientRect();
    query.exec(function(rect) {
      let width = rect[0].width;
      let height = rect[0].height;
      that.setData({
        width,
        height
      });
      const context = wx.createCanvasContext('firstCanvas')
      that.setData({
        context: context
      })
      context.setStrokeStyle('#00ff00')
      context.setLineWidth(2)
      context.setFontSize(20)
      context.draw()
    });
  }
})