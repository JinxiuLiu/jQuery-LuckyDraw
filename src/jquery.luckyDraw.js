/**
 * Created by Liujx on 2017-06-08 11:41:06
 */
;(function(global, $) {
	'use strict';

	var luckyDraw = function(options) {
		this.timer,
		this.defaults = {
			id: 'lottery',		// 默认盒子id
		    index: -1,			// 当前转动到哪个位置，起点位置
		    count: 0,			// 总共有多少个位置
		    speed: 20,			// 初始转动速度
		    times: 0,			// 转动次数
		    cycle: 60,			// 转动基本次数：即至少需要转动多少次再进入抽奖环节
		    prize: 0,			// 中奖位置
		    beforeSend: $.noop,	// 开始转动之前回调
		    success: $.noop		// 成功回调
		},
		this.opts = $.extend({}, this.defaults, options),
		this.initialization()
	}

	luckyDraw.prototype = {
		constructor: luckyDraw,
		init: function(id) {
			var $lottery = $("#" + id),
				$units = $lottery.find(".lottery-unit");
	        if ($units.length > 0) {
	            this.opts.obj = $lottery;
	            this.opts.count = $units.length;
	            $lottery.find(".lottery-unit-" + this.opts.index).addClass("active");
	        }
	    },
	    _initRoll: function() {
	        var count = this.opts.count,
	        	index = this.opts.index;

	        $(".lottery-unit-" + index).removeClass("active");
	        index += 1;
	        if (index > count - 1) {
	            index = 0;
	        };
	        $(".lottery-unit-" + index).addClass("active");
	        this.opts.index = index;
	        return false;
	    },
	    stop: function(index) {
	        this.opts.prize = index;
	        return false;
	    },
	    luckyDrawRoll: function() {
		    this.opts.times += 1;
		    this._initRoll();
		    if (this.opts.times > this.opts.cycle + 10 && this.opts.prize == this.opts.index) {
		        clearTimeout(this.opts.timer);
				global.isClick = false;
		        this.opts.success();
		    } else {
		        if (this.opts.times < this.opts.cycle) {
		        	// 快速转动阶段
		            this.opts.speed -= 10;
		        } else {
		        	// 抽奖环节
		            if (this.opts.times > this.opts.cycle + 10 && ((this.opts.prize == 0 && this.opts.index == 7) || this.opts.prize == this.opts.index + 1)) {
		                this.opts.speed += 110;
		            } else {
		                this.opts.speed += 20;
		            }
		        }
		        if (this.opts.speed < 40) {
		            this.opts.speed = 40;
		        }
		    	var self = this;
		        this.opts.timer = setTimeout(function(){
		        	self.luckyDrawRoll();
		        }, this.opts.speed);
		    }
		    return false;
		},
		initialization: function() {
			this.opts.beforeSend();
			this.init(this.opts.id);
			this.luckyDrawRoll();
		}
	}

	global.luckyDraw = luckyDraw;

	$.fn.luckyDraw = function(options){
		global.isClick = false;	
		this.click(function() {
			if(isClick) return false;
		    global.isClick = true;
			new luckyDraw(options);
		});
		return this;
	}

})(this, jQuery);