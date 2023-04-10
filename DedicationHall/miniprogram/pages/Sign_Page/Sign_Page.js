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
  },
  /**记录开始点 */
  bindtouchstart: function(e) {
    this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
    this.setData({
      ifhidden:'hidden'
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
    let str = "签名区域";
    this.data.context.fillText(str, Math.ceil((this.data.width - this.data.context.measureText(str).width) / 2), Math.ceil(this.data.height / 2) - 20)
    this.data.context.draw()
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
      let str = "签名区域";
      context.fillText(str, Math.ceil((width - context.measureText(str).width) / 2), Math.ceil(height / 2) - 20)
      context.draw()
    });
  }
})