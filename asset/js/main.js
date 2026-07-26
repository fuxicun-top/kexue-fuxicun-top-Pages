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

// 关于弹窗
$(document).on('click', 'a[href="#about"]', function(e) {
	e.preventDefault();
	var about = document.getElementById('about');
	if (about) {
		about.style.display = 'block';
		// 首次打开时加载 CHANGELOG
		if (!window._changelogLoaded) {
			loadChangelogTimeline();
			window._changelogLoaded = true;
		}
	}
});
$(document).on('click', '#about', function(e) {
	if (e.target === this) this.style.display = 'none';
});

// 加载 CHANGELOG 渲染为时间线
async function loadChangelogTimeline() {
	try {
		const res = await fetch('./CHANGELOG');
		if (!res.ok) return;
		const text = await res.text();
		const entries = parseChangelog(text);
		const container = document.getElementById('changelog-timeline');
		if (!container || !entries.length) return;
		container.innerHTML = entries.map((entry, i) => {
			const isLast = i === entries.length - 1;
			const dotColor = entry.type === '新增' ? '#22c55e' : entry.type === '修复' ? '#ef4444' : '#faab41';
			return `
				<div style="position: relative; padding-left: 28px; padding-bottom: ${isLast ? '0' : '20px'};">
					<div style="position: absolute; left: 0; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: ${dotColor}; box-shadow: 0 0 8px ${dotColor}60;"></div>
					${!isLast ? '<div style="position: absolute; left: 4px; top: 16px; width: 2px; height: calc(100% - 6px); background: rgba(255,255,255,0.1);"></div>' : ''}
					<div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px 16px; margin-bottom: 4px;">
						<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
							<span style="font-size: 13px; font-weight: 700; color: #faab41;">${entry.version}</span>
							<span style="font-size: 11px; color: rgba(255,255,255,0.4);">${entry.date}</span>
						</div>
						<ul style="list-style: none; padding: 0; margin: 0;">
							${entry.items.map(item => {
								let icon = '●';
								let color = 'rgba(255,255,255,0.6)';
								if (item.startsWith('新增')) { icon = '✦'; color = '#22c55e'; }
								else if (item.startsWith('修复')) { icon = '✎'; color = '#ef4444'; }
								else if (item.startsWith('优化')) { icon = '◆'; color = '#faab41'; }
								else if (item.startsWith('品牌')) { icon = '★'; color = '#a78bfa'; }
								else if (item.startsWith('地址')) { icon = '→'; color = '#38bdf8'; }
								return `<li style="color: ${color}; font-size: 13px; line-height: 1.5; margin-bottom: 2px;"><span style="margin-right: 4px;">${icon}</span>${item.replace(/^[^：：]+[：:]/, '')}</li>`;
							}).join('')}
						</ul>
					</div>
				</div>`;
		}).join('');
	} catch (e) {
		console.error('加载更新日志失败:', e);
	}
}

function parseChangelog(text) {
	const versions = [];
	const blocks = text.split(/^## /m).filter(b => b.trim());
	blocks.forEach(block => {
		const lines = block.trim().split('\n');
		const header = lines[0].trim();
		// 解析版本号 v2.1.20260725120000
		const verMatch = header.match(/^(v[\d.]+)(\d{14})?$/);
		let version = header;
		let date = '';
		if (verMatch) {
			version = verMatch[1];
			if (verMatch[2]) {
				const ts = verMatch[2];
				date = `${ts.substring(0,4)}-${ts.substring(4,6)}-${ts.substring(6,8)} ${ts.substring(8,10)}:${ts.substring(10,12)}:${ts.substring(12,14)}`;
			}
		}
		const items = lines.slice(1).map(l => l.replace(/^- /, '').trim()).filter(Boolean);
		versions.push({ version, date, items });
	});
	return versions;
}

//title
// 从当前页面标题获取基础名称（优先使用 KV 数据，无数据时使用默认值）
var originalTitle = document.title.replace(/ - .*$/, '');

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
var _kvReady = null;
(function loadGrzyFromKV() {
  _kvReady = fetch('./admin/grzy.json')
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

      // 5. 导航按钮（KV 数据缺失时保留页面硬编码的默认值）
      if (data.navButtons && Array.isArray(data.navButtons) && data.navButtons.length > 0) {
        var navContainer = document.getElementById('grzy-navButtons');
        if (navContainer) {
          navContainer.innerHTML = data.navButtons.map(function (btn) {
            if (!btn.href || !btn.text) return ''; // 跳过无效数据
            var target = btn.target ? ' target="' + btn.target + '"' : '';
            return '<a href="' + btn.href + '" class="pill-button"' + target + '>' +
              '<div class="pill-button-decor pill-left"></div>' +
              '<div class="pill-button-decor pill-right"></div>' +
              '<span class="pill-button-text">' + btn.text + '</span>' +
              '</a>';
          }).filter(Boolean).join('\n');
          if (!navContainer.innerHTML) navContainer.innerHTML = '';
        }
      }

      // 6. 社交链接（KV 数据缺失时保留页面硬编码的默认值）
      if (data.socialLinks && Array.isArray(data.socialLinks) && data.socialLinks.length > 0) {
        var socialContainer = document.getElementById('grzy-socialLinks');
        if (socialContainer) {
          socialContainer.innerHTML = data.socialLinks.map(function (link) {
            if (!link.href || !link.icon) return ''; // 跳过无效数据
            var target = link.target ? ' target="' + link.target + '"' : '';
            // 确保 icon 有 fas/fab 前缀（与原版模板一致）
            var iconClass = link.icon;
            if (!iconClass.match(/^(fas|fab|far|fal)\s/)) {
              // 根据图标类型判断前缀：github/twitter/linkedin 等品牌图标用 fab
              var brandIcons = ['github', 'twitter', 'linkedin', 'instagram', 'youtube', 'tiktok', 'telegram', 'discord', 'wechat', 'qq', 'weibo', 'bilibili'];
              var isBrand = brandIcons.some(function(b) { return iconClass.indexOf(b) !== -1 || (link.title && link.title.indexOf(b) !== -1); });
              iconClass = (isBrand ? 'fab ' : 'fas ') + iconClass;
            }
            return '<a href="' + link.href + '" class="contact-icon"' + target + ' title="' + (link.title || '') + '">' +
              '<i class="' + iconClass + '"></i></a>';
          }).filter(Boolean).join('\n');
          if (!socialContainer.innerHTML) socialContainer.innerHTML = '';
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
