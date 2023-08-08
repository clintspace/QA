!function(t,e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],(function(t){e(t)})):"object"==typeof module&&module.exports?module.exports=t.EasyZoom=e(require("jquery")):t.EasyZoom=e(t.jQuery)}(this,(function(t){"use strict";var e,i,o,s,h,n,a={loadingNotice:"Loading image",errorNotice:"The image could not be loaded",errorDuration:2500,linkAttribute:"href",preventClicks:!0,beforeShow:t.noop,beforeHide:t.noop,onShow:t.noop,onHide:t.noop,onMove:t.noop};function r(e,i){this.$target=t(e),this.opts=t.extend({},a,i,this.$target.data()),void 0===this.isOpen&&this._init()}r.prototype._init=function(){this.$link=this.$target.find("a"),this.$image=this.$target.find("img"),this.$flyout=t('<div class="easyzoom-flyout" />'),this.$notice=t('<div class="easyzoom-notice" />'),this.$target.on({"mousemove.easyzoom touchmove.easyzoom":t.proxy(this._onMove,this),"mouseleave.easyzoom touchend.easyzoom":t.proxy(this._onLeave,this),"mouseenter.easyzoom touchstart.easyzoom":t.proxy(this._onEnter,this)}),this.opts.preventClicks&&this.$target.on("click.easyzoom",(function(t){t.preventDefault()}))},r.prototype.show=function(t,h){var n,a,r,c,d=this;if(!1!==this.opts.beforeShow.call(this)){if(!this.isReady)return this._loadImage(this.$link.attr(this.opts.linkAttribute),(function(){!d.isMouseOver&&h||d.show(t)}));this.$target.append(this.$flyout),n=this.$target.width(),a=this.$target.height(),r=this.$flyout.width(),c=this.$flyout.height(),e=this.$zoom.width()-r,i=this.$zoom.height()-c,e<0&&(e=0),i<0&&(i=0),o=e/n,s=i/a,this.isOpen=!0,this.opts.onShow.call(this),t&&this._move(t)}},r.prototype._onEnter=function(t){var e=t.originalEvent.touches;this.isMouseOver=!0,e&&1!=e.length||(t.preventDefault(),this.show(t,!0))},r.prototype._onMove=function(t){this.isOpen&&(t.preventDefault(),this._move(t))},r.prototype._onLeave=function(){this.isMouseOver=!1,this.isOpen&&this.hide()},r.prototype._onLoad=function(t){t.currentTarget.width&&(this.isReady=!0,this.$notice.detach(),this.$flyout.html(this.$zoom),this.$target.removeClass("is-loading").addClass("is-ready"),t.data.call&&t.data())},r.prototype._onError=function(){var t=this;this.$notice.text(this.opts.errorNotice),this.$target.removeClass("is-loading").addClass("is-error"),this.detachNotice=setTimeout((function(){t.$notice.detach(),t.detachNotice=null}),this.opts.errorDuration)},r.prototype._loadImage=function(e,i){var o=new Image;this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)),this.$zoom=t(o).on("error",t.proxy(this._onError,this)).on("load",i,t.proxy(this._onLoad,this)),o.style.position="absolute",o.src=e},r.prototype._move=function(t){if(0===t.type.indexOf("touch")){var a=t.touches||t.originalEvent.touches;h=a[0].pageX,n=a[0].pageY}else h=t.pageX||h,n=t.pageY||n;var r=this.$target.offset(),c=n-r.top,d=h-r.left,l=Math.ceil(c*s),p=Math.ceil(d*o);if(p<0||l<0||p>e||l>i)this.hide();else{var u=-1*l,f=-1*p;this.$zoom.css({top:u,left:f}),this.opts.onMove.call(this,u,f)}},r.prototype.hide=function(){this.isOpen&&!1!==this.opts.beforeHide.call(this)&&(this.$flyout.detach(),this.isOpen=!1,this.opts.onHide.call(this))},r.prototype.swap=function(e,i,o){this.hide(),this.isReady=!1,this.detachNotice&&clearTimeout(this.detachNotice),this.$notice.parent().length&&this.$notice.detach(),this.$target.removeClass("is-loading is-ready is-error"),this.$image.attr({src:e,srcset:t.isArray(o)?o.join():o}),this.$link.attr(this.opts.linkAttribute,i)},r.prototype.teardown=function(){this.hide(),this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"),this.detachNotice&&clearTimeout(this.detachNotice),delete this.$link,delete this.$zoom,delete this.$image,delete this.$notice,delete this.$flyout,delete this.isOpen,delete this.isReady},t.fn.easyZoom=function(e){return this.each((function(){var i=t.data(this,"easyZoom");i?void 0===i.isOpen&&i._init():t.data(this,"easyZoom",new r(this,e))}))}}));