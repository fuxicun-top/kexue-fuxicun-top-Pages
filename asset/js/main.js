/*
	HTML Starter Template - Main JavaScript
	Original Source: https://github.com/AsisYu/html-starter-qwpicu.git
	License: Open Source
	Author: AsisYu
	Description: Main JavaScript functionality for the personal homepage template
*/

var iUp = (function () {
	var t = 0,
		d = 150,
		clean = function () {
			t = 0;
		},
		up = function (e) {
			setTimeout(function () {
				$(e).addClass("up")
			}, t);
			t += d;
		},
		down = function (e) {
			$(e).removeClass("up");
		},
		toggle = function (e) {
			setTimeout(function () {
				$(e).toggleClass("up")
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	}
})();
yiyan = "";

// 文字高亮处理函数
function processTextWithHighlights(text) {
	// 定义需要高亮的文字和对应的样式类
	var highlightRules = [
		{ word: '明确', class: 'highlight-red' },
		{ word: '和', class: 'highlight-green' },
		{ word: '梦想', class: 'highlight-blue' },
		{ word: '希望', class: 'highlight-purple' },
		{ word: '爱', class: 'highlight-pink' },
		{ word: '美', class: 'highlight-cyan' },
		{ word: '真', class: 'highlight-yellow' },
		{ word: '善', class: 'highlight-orange' },
		{ word: '自由', class: 'highlight-red' },
		{ word: '快乐', class: 'highlight-green' },
		{ word: '幸福', class: 'highlight-blue' },
		{ word: '成功', class: 'highlight-purple' },
		{ word: '努力', class: 'highlight-pink' },
		{ word: '坚持', class: 'highlight-cyan' },
		{ word: '勇气', class: 'highlight-yellow' },
		{ word: '智慧', class: 'highlight-orange' },
		{ word: '时间', class: 'highlight-red' },
		{ word: '生命', class: 'highlight-green' },
		{ word: '青春', class: 'highlight-blue' },
		{ word: '未来', class: 'highlight-purple' },
		{ word: '过去', class: 'highlight-pink' },
		{ word: '现在', class: 'highlight-cyan' },
		{ word: '朋友', class: 'highlight-yellow' },
		{ word: '家人', class: 'highlight-orange' },
		{ word: '学习', class: 'highlight-red' },
		{ word: '成长', class: 'highlight-green' },
		{ word: '改变', class: 'highlight-blue' },
		{ word: '选择', class: 'highlight-purple' },
		{ word: '决定', class: 'highlight-pink' },
		{ word: '思考', class: 'highlight-cyan' }
	];
	
	var processedText = text;
	
	// 应用高亮规则
	highlightRules.forEach(function(rule) {
		var regex = new RegExp(rule.word, 'g');
		processedText = processedText.replace(regex, '<span class="' + rule.class + '">' + rule.word + '</span>');
	});
	
	// 随机高亮方案：根据字符长度随机选择字符进行高亮
	var randomHighlightedText = addRandomHighlights(processedText);
	
	return randomHighlightedText;
}

// 随机高亮函数
function addRandomHighlights(text) {
	// 移除已有的HTML标签，只处理纯文本
	var cleanText = text.replace(/<[^>]*>/g, '');
	var textLength = cleanText.length;
	
	// 根据文本长度决定随机高亮的字符数量
	var highlightCount;
	if (textLength <= 10) {
		highlightCount = Math.floor(textLength * 0.3); // 30%的字符
	} else if (textLength <= 20) {
		highlightCount = Math.floor(textLength * 0.25); // 25%的字符
	} else {
		highlightCount = Math.floor(textLength * 0.2); // 20%的字符
	}
	
	// 确保至少高亮1个字符，最多不超过文本长度的一半
	highlightCount = Math.max(1, Math.min(highlightCount, Math.floor(textLength / 2)));
	
	// 生成随机索引数组
	var randomIndexes = [];
	while (randomIndexes.length < highlightCount) {
		var randomIndex = Math.floor(Math.random() * textLength);
		// 避免重复索引，并且跳过标点符号和空格
		if (randomIndexes.indexOf(randomIndex) === -1 && 
			!/[\s\p{P}]/u.test(cleanText[randomIndex])) {
			randomIndexes.push(randomIndex);
		}
	}
	
	// 对随机索引进行排序，确保从后往前替换
	randomIndexes.sort(function(a, b) { return b - a; });
	
	// 创建结果数组
	var result = cleanText.split('');
	
	// 为随机选中的字符添加高亮
	randomIndexes.forEach(function(index) {
		var char = result[index];
		// 从8种颜色中随机选择高亮
		var highlightClasses = [
			'highlight-red', 'highlight-green', 'highlight-blue', 'highlight-purple',
			'highlight-orange', 'highlight-cyan', 'highlight-pink', 'highlight-yellow'
		];
		var randomClassIndex = Math.floor(Math.random() * highlightClasses.length);
		var highlightClass = highlightClasses[randomClassIndex];
		result[index] = '<span class="' + highlightClass + '">' + char + '</span>';
	});
	
	return result.join('');
}

$(document).ready(function () {

	// 获取一言数据——等 KV 加载完成后执行，确保使用正确的 API 地址
	if (_kvReady) {
	  _kvReady.then(function (data) {
		var hitokotoUrl = window._grzyHitokotoApi || 'https://v1.hitokoto.cn';
		fetch(hitokotoUrl).then(function (res) {
			return res.json();
		}).then(function (e) {
			yiyan = e.hitokoto;
			// 处理一言文字，添加高亮效果
			var processedHitokoto = processTextWithHighlights(e.hitokoto);
			$('#description').html(processedHitokoto + "<br/> -「<strong>" + e.from + "</strong>」")
		}).catch(function (err) {
			console.error(err);
		});
	  });
	} else {
	  // KV 不可用，fallback 到默认地址
	  fetch('https://v1.hitokoto.cn').then(function (res) {
		return res.json();
	  }).then(function (e) {
		yiyan = e.hitokoto;
		var processedHitokoto = processTextWithHighlights(e.hitokoto);
		$('#description').html(processedHitokoto + "<br/> -「<strong>" + e.from + "</strong>」")
	  }).catch(function (err) {
		console.error(err);
	  });
	}
// var url = 'https://query.yahooapis.com/v1/public/yql' + 
	// '?q=' + encodeURIComponent('select * from json where url=@url') +
	// '&url=' + encodeURIComponent('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8') +
	// '&format=json&callback=?';

	/**
	 * 获取Bing壁纸
	 * 原先 YQL 已经无法提供服务了
	 * 改用 JsonBird：https://bird.ioliu.cn/
	 * 
	 */
	// var url = '';
	// var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
	// var index = sessionStorage.getItem("index");
	// var $panel = $('#panel');
	// if (imgUrls == null) {
	// 	imgUrls = new Array();
	// 	index = 0;
	// 	$.get(url, function (result) {
	// 		images = result.images;
	// 		for (let i = 0; i < images.length; i++) {
	// 			const item = images[i];
	// 			imgUrls.push(item.url);
	// 		}
	// 		var imgUrl = imgUrls[index];
	// 		var url = "https://www.bing.com" + imgUrl;
	// 		$panel.css("background", "url('" + url + "') center center no-repeat #666");
	// 		$panel.css("background-size", "cover");
	// 		sessionStorage.setItem("imgUrls", JSON.stringify(imgUrls));
	// 		sessionStorage.setItem("index", index);
	// 	});
	// } else {
	// 	if (index == 7)
	// 		index = 0;
	// 	else
	// 		index++;
	// 	var imgUrl = imgUrls[index];
	// 	var url = "https://www.bing.com" + imgUrl;
	// 	$panel.css("background", "url('" + url + "') center center no-repeat #666");
	// 	$panel.css("background-size", "cover");
	// 	sessionStorage.setItem("index", index);
	// }

	$(".iUp").each(function (i, e) {
		iUp.up(e);
	});

	$(".js-avatar")[0].onload = function () {
		$(".js-avatar").addClass("show");
	}
});

$('.btn-mobile-menu__icon').click(function () {
	if ($('.navigation-wrapper').css('display') == "block") {
		$('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
			$('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
		});
		$('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

	} else {
		$('.navigation-wrapper').toggleClass('visible animated bounceInDown');
	}
	$('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-ngleup animated fadeIn');
});

//title
// 在脚本开始时保存原始标题（假设原始标题不包含时间信息）
var originalTitle = "小周の主页"; // 根据实际情况调整

function updateTimeTitle() {
  // 获取当前时间
  var currentDateTime = new Date();
  
  // 格式化时间。以下格式为：小时
  var hour = currentDateTime.getHours();

  //两位值
  var formattedHours = hour.toString().padStart(2, '0');

  //判断
  if (formattedHours <= 5) {
    formattedText = "深夜啦，还不休息吗？身体是革命的本钱哦";
} else if (formattedHours <= 8) {
    formattedText = "早上好，昨晚睡得还好吗？";
} else if (formattedHours <= 10) {
    formattedText = "而你 我的朋友，天一亮你才是真正的帕鲁";
} else if (formattedHours >= 16 && formattedHours <= 17) {
    formattedText = "傍晚了，想好吃什么了吗？";
} else if (formattedHours >= 20 && formattedHours <= 24) {
    formattedText = "快深夜了，再忙也要注意休息呀";
} else {
    formattedText = yiyan;
}

  // 仅在原始标题基础上添加当前时间信息
  document.title = originalTitle + " - " + formattedText;
}

// 定期更新标题以保持时间更新
setInterval(updateTimeTitle, 1000);

// ==================== KV 首页配置加载 ====================
// 从 admin/grzy.json 获取 KV 数据，有数据则替换页面硬编码的默认值
(function loadGrzyFromKV() {
  fetch('./admin/grzy.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (!data || typeof data !== 'object') return;

      // 1. 页面标题
      if (data.pageTitle) document.title = data.pageTitle;

      // 2. SEO meta
      var kw = document.querySelector("meta[name='keywords']");
      if (kw && data.keywords) kw.setAttribute('content', data.keywords);
      var desc = document.querySelector("meta[name='description']");
      if (desc && data.description) desc.setAttribute('content', data.description);

      // 3. 头像
      var avatarEls = document.querySelectorAll('[data-grzy="avatarUrl"]');
      avatarEls.forEach(function (el) { if (data.avatarUrl) el.src = data.avatarUrl; });
      var fallbackEls = document.querySelectorAll('[data-grzy="avatarFallback"]');
      fallbackEls.forEach(function (el) { if (data.avatarFallback) el.src = data.avatarFallback; });

      // 4. 昵称 & 签名
      var nameEl = document.querySelector('[data-grzy="name"]');
      if (nameEl && data.name) nameEl.textContent = data.name;
      var subtitleEl = document.querySelector('[data-grzy="subtitle"]');
      if (subtitleEl && data.subtitle) subtitleEl.textContent = data.subtitle;

      // 5. 导航按钮
      if (data.navButtons && Array.isArray(data.navButtons) && data.navButtons.length > 0) {
        var navContainer = document.getElementById('grzy-navButtons');
        if (navContainer) {
          navContainer.innerHTML = data.navButtons.map(function (btn) {
            var target = btn.target ? ' target="' + btn.target + '"' : '';
            return '<a href="' + btn.href + '" class="pill-button"' + target + '>' +
              '<div class="pill-button-decor pill-left"></div>' +
              '<div class="pill-button-decor pill-right"></div>' +
              '<span class="pill-button-text">' + btn.text + '</span>' +
              '</a>';
          }).join('\n');
        }
      }

      // 6. 社交链接
      if (data.socialLinks && Array.isArray(data.socialLinks) && data.socialLinks.length > 0) {
        var socialContainer = document.getElementById('grzy-socialLinks');
        if (socialContainer) {
          socialContainer.innerHTML = data.socialLinks.map(function (link) {
            var target = link.target ? ' target="' + link.target + '"' : '';
            // 确保 icon 有 fas/fab 前缀（与原版模板一致）
            var iconClass = link.icon;
            if (!iconClass.match(/^(fas|fab|far|fal)\s/)) {
              // 根据图标类型判断前缀：github/twitter/linkedin 等品牌图标用 fab
              var brandIcons = ['github', 'twitter', 'linkedin', 'instagram', 'youtube', 'tiktok', 'telegram', 'discord', 'wechat', 'qq', 'weibo', 'bilibili'];
              var isBrand = brandIcons.some(function(b) { return iconClass.indexOf(b) !== -1 || (link.title && link.title.indexOf(b) !== -1); });
              iconClass = (isBrand ? 'fab ' : 'fas ') + iconClass;
            }
            return '<a href="' + link.href + '" class="contact-icon"' + target + ' title="' + link.title + '">' +
              '<i class="' + iconClass + '"></i></a>';
          }).join('\n');
        }
      }

      // 7. 一言 API 地址（后续一言请求会用）
      if (data.hitokotoApi) window._grzyHitokotoApi = data.hitokotoApi;

      // 8. 版权名称
      var copyrightEl = document.querySelector('[data-grzy="copyrightName"]');
      if (copyrightEl) copyrightEl.textContent = data.copyrightName || copyrightEl.textContent;

      // 9. 备案号
      var beianEl = document.querySelector('[data-grzy="beianText"]');
      if (beianEl) beianEl.textContent = data.beianText || beianEl.textContent;
      var beianLink = beianEl ? beianEl.closest('a') : null;
      if (data.beianUrl && beianLink) beianLink.href = data.beianUrl;

      // 更新 originalTitle 以便动态标题使用
      if (data.pageTitle) {
        originalTitle = data.pageTitle;
      }

      return data;
    })
    .catch(function () {
      // KV 不可用或无数据，保持页面硬编码的默认值不动
    });
})();

