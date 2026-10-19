// ============================================================================
// 動的シャドウ＆3D立体表現 一括設定（ここで影の濃さ・長さ・文字の厚みを一括調整できます）
// ============================================================================
const SHADOW_CONFIG = {
    // --- 全体倍率（ここを変えるだけで全要素の影・立体感が一括で変わります） ---
    opacityScale: 0.55, // 影の濃さ倍率（例: 1.0 でくっきり濃く、0.5 で控えめ）
    lengthScale: 1.15,  // 影の伸びる長さ倍率（例: 1.5 で1.5倍長く伸びる）
    blurScale: 1.05,    // 影のぼかし倍率（例: 0.7 でハードな影、1.4 で柔らかい影）
    extrudeScale: 0.85, // 大見出し文字の3D厚み倍率（0 で厚みOFF、1.2 で強調）
    colorRGB: '10, 10, 10', // 影のベース色 (R, G, B)
    lerpSpeed: 0.2,     // カーソルへの追従速度（0.05 = ゆっくり慣性、0.3 = 素早く追従）

    // --- 要素別の詳細設定 ---
    card: {
        // 画像・サムネイル・動画カード（リムライト＋多層シャドウ）
        distFactor: 0.22,       // カーソル距離に対する伸び率
        maxReach: 64,           // 最大の伸び量 (px)
        layers: [
            { offset: 0.22, blur: 10, spread: 0,  opacity: 0.34 }, // ① 根元の接地影
            { offset: 0.65, blur: 28, spread: -2, opacity: 0.42 }, // ② 中間の本影
            { offset: 1.30, blur: 54, spread: -2, opacity: 0.28 }  // ③ 先端の伸びる半影
        ]
    },
    pill: {
        // ボタン・スキルバッジ・受賞バッジ（カーソル接近時に浮き上がる距離減衰つき）
        distFactor: 0.12,
        maxReach: 18,
        falloffRadius: 520,     // この距離(px)以内にあるボタン・バッジが強く影を落とす
        layers: [
            { offset: 0.35, blur: 5,  spread: 0, opacity: 0.22 },
            { offset: 1.00, blur: 14, spread: 0, opacity: 0.28 }
        ]
    },
    heading: {
        // 大見出しテキストのみ（武谷 信次郎 / 作品メインタイトル / Featuredタイトル）
        distFactor: 0.08,
        maxReach: 16,
        extrudeSteps: 2,        // 文字の輪郭を崩さないシャープな2層厚み
        layers: [
            { offset: 0.45, blur: 6,  opacity: 0.24 },
            { offset: 1.00, blur: 16, opacity: 0.26 }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const worksGrid = document.getElementById('works-grid');
    const workDetail = document.getElementById('work-detail');
    
    // --- Index Page Logic ---
    if (worksGrid && typeof portfolioData !== 'undefined') {
        const trophySvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`;
        const htmlContent = portfolioData.map(item => {
            const isFeatured = item.id === 'project-1';
            const featuredClass = isFeatured ? ' work-item-featured' : '';
            const descText = isFeatured ? (item.featuredSummary || item.shortDescription) : item.shortDescription;

            return `
            <li class="work-item${featuredClass}">
                <a href="${item.link}">
                    <div class="thumbnail-wrapper">
                        <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" />
                    </div>
                    <div class="work-info">
                        ${isFeatured ? `<span class="featured-label">FEATURED PROJECT</span>` : ''}
                        <p class="work-title">${item.title}</p>
                        ${descText ? `<p class="work-short-desc">${descText}</p>` : ''}
                        ${isFeatured && item.featuredAwards ? `
                            <div class="featured-awards">
                                ${item.featuredAwards.map(aw => `<span class="award-badge">${trophySvg}<span>${aw}</span></span>`).join('')}
                            </div>
                        ` : ''}
                        ${item.tags ? `
                            <div class="work-tags">
                                ${item.tags.map(tag => `<span class="work-tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                        ${isFeatured ? `
                            <div class="featured-cta-wrap">
                                <span class="featured-cta-btn">
                                    <span>View Project</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M5 12h14"/>
                                        <path d="m12 5 7 7-7 7"/>
                                    </svg>
                                </span>
                            </div>
                        ` : ''}
                    </div>
                </a>
            </li>
        `}).join('');

        worksGrid.innerHTML = htmlContent;
    }

    // --- Detail Page Logic ---
    if (workDetail && typeof portfolioData !== 'undefined') {
        // Get the ID from the URL query parameter (e.g. ?id=project-1)
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        if (!projectId) {
            workDetail.innerHTML = '<p>作品が指定されていません。</p>';
            return;
        }

        // Find the project in data.js
        const project = portfolioData.find(item => item.id === projectId);
        
        if (!project) {
            workDetail.innerHTML = '<p>作品が見つかりませんでした。</p>';
            return;
        }

        // Update document title
        document.title = `${project.title} - Taketani Shinjiro`;

        const images = project.images ? [...project.images] : (project.thumbnail ? [project.thumbnail] : []);
        // 最初の画像をキービジュアルとして取得
        const keyVisualSrc = images.length > 0 ? images.shift() : null;

        function parseInlineMarkdown(str) {
            if (typeof str !== 'string') return '';
            return str.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        }

        function renderDemoMediaHtml(demoMedia) {
            if (!demoMedia) return '';
            const isVideo = demoMedia.match(/\.(mp4|webm|mov|ogg)$/i);
            const ytMatch = demoMedia.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
            if (ytMatch && ytMatch[1]) {
                return `<div class="video-embed"><div class="iframe-container"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div></div>`;
            }
            if (isVideo) {
                return `<div class="demo-media"><video src="${demoMedia}" controls style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);" preload="metadata"></video></div>`;
            }
            return `<div class="demo-media"><img src="${demoMedia}" alt="Demo" loading="lazy" /></div>`;
        }

        // ... generateDetailContent function ...
        function generateDetailContent(project, remainingImages) {
            let html = '';

            function renderImage() {
                if (remainingImages.length > 0) {
                    const imgSrc = remainingImages.shift();
                    return `<div class="detail-image-inline"><img src="${imgSrc}" alt="${project.title}" loading="lazy" /></div>`;
                }
                return '';
            }

            if (!project.content) {
                html += `<div class="work-section"><p>${parseInlineMarkdown(project.description || '')}</p></div>`;
                while (remainingImages.length > 0) {
                    html += renderImage();
                }
                return html;
            }

            const c = project.content;
            const globalTitles = typeof sectionTitles !== 'undefined' ? sectionTitles : {};
            const hasTwoColSummary = !Array.isArray(c) && c.overview && (c.techStack || c.achievements);

            if (hasTwoColSummary) {
                const ov = typeof c.overview === 'string' ? { text: c.overview } : c.overview;
                const desc = ov.description || ov.text || '';
                const techItems = Array.isArray(c.techStack) ? c.techStack : [];
                const achItems = Array.isArray(c.achievements) ? c.achievements : [];

                html += `
                <section class="work-section detail-summary-section">
                    <div class="detail-summary-grid">
                        <div class="summary-main">
                            <h2>${ov.title || globalTitles.overview || 'プロジェクトの概要'}</h2>
                            ${ov.catchphrase ? `<h3 class="summary-catchphrase">${ov.catchphrase}</h3>` : ''}
                            ${desc ? `<p>${parseInlineMarkdown(desc)}</p>` : ''}
                        </div>
                        <aside class="summary-specs">
                            ${techItems.length > 0 ? `
                                <div class="spec-block">
                                    <h2 class="spec-heading">${globalTitles.techStack || '使用技術・開発環境'}</h2>
                                    <dl class="spec-list">
                                        ${techItems.map(item => {
                                            if (item && item.category && item.details) {
                                                return `<div class="spec-item"><dt>${item.category}</dt><dd>${parseInlineMarkdown(item.details)}</dd></div>`;
                                            }
                                            return `<div class="spec-item"><dd>${parseInlineMarkdown(typeof item === 'string' ? item : '')}</dd></div>`;
                                        }).join('')}
                                    </dl>
                                </div>
                            ` : ''}
                            ${achItems.length > 0 ? `
                                <div class="spec-block">
                                    <h2 class="spec-heading">${globalTitles.achievements || '実績'}</h2>
                                    <ul class="spec-achievements">
                                        ${achItems.map(ach => `<li>${parseInlineMarkdown(typeof ach === 'string' ? ach : '')}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </aside>
                    </div>
                    ${renderDemoMediaHtml(ov.demoMedia)}
                </section>`;
            }

            let sections = [];
            if (Array.isArray(c)) {
                sections = c;
            } else {
                sections = Object.keys(c).map(key => {
                    if (hasTwoColSummary && (key === 'overview' || key === 'techStack' || key === 'achievements')) {
                        return null;
                    }
                    let data = c[key];
                    if (!data) return null;

                    let sectionObj = {};
                    if (typeof data === 'string') {
                        sectionObj = { text: data };
                    } else if (Array.isArray(data)) {
                        if (key === 'gallery') {
                            sectionObj = { images: data };
                        } else if (key === 'customSections') {
                            sectionObj = { isCustomSectionsArray: true, items: data };
                        } else {
                            sectionObj = { items: data };
                        }
                    } else if (typeof data === 'object') {
                        sectionObj = { ...data };
                    }
                    
                    sectionObj.type = sectionObj.type || key;
                    return sectionObj;
                }).filter(Boolean);
            }

            sections.forEach(sec => {
                if (sec.isCustomSectionsArray) {
                    sec.items.forEach(customSec => {
                        html += `<section class="work-section">
                            <h2>${customSec.title}</h2>
                            ${customSec.contentHtml || (customSec.text ? `<p>${parseInlineMarkdown(customSec.text)}</p>` : '')}
                        </section>`;
                    });
                    return;
                }

                // Get title from data.js sectionTitles, or sec.title, or fallback to the key itself
                let title = sec.title || globalTitles[sec.type] || sec.type;
                let renderedSomething = false;

                if (sec.type === 'overview') {
                    const desc = sec.description || sec.text || '';
                    html += `<section class="work-section">
                        <h2>${title}</h2>
                        ${sec.catchphrase ? `<h3>${sec.catchphrase}</h3>` : ''}
                        ${renderDemoMediaHtml(sec.demoMedia)}
                        ${desc ? `<p>${parseInlineMarkdown(desc)}</p>` : ''}
                    </section>`;
                    renderedSomething = true;
                } else if (sec.type === 'links') {
                    const items = sec.items || [];
                    if (items.length > 0) {
                        html += `<section class="work-section">
                            <h2>${title}</h2>`;
                        
                        const standardLinks = [];
                        const videoLinks = [];
                        
                        items.forEach(link => {
                            const ytMatch = link.url ? link.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/) : null;
                            if (ytMatch && ytMatch[1]) {
                                videoLinks.push({ ...link, ytId: ytMatch[1] });
                            } else {
                                standardLinks.push(link);
                            }
                        });

                        if (videoLinks.length > 0) {
                            videoLinks.forEach(video => {
                                html += `
                                    <div class="video-embed">
                                        <h3>${video.label}</h3>
                                        <div class="iframe-container">
                                            <iframe src="https://www.youtube.com/embed/${video.ytId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
                                        </div>
                                    </div>
                                `;
                            });
                        }

                        if (standardLinks.length > 0) {
                            html += `<ul>
                                ${standardLinks.map(link => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a></li>`).join('')}
                            </ul>`;
                        }
                        
                        html += `</section>`;
                        renderedSomething = true;
                    }
                } else if (sec.type === 'gallery') {
                    const imgs = sec.images || [];
                    if (imgs.length > 0) {
                        const titleHtml = title ? `<h2>${title}</h2>` : '';
                        html += `<section class="work-section">
                            ${titleHtml}
                            <div class="photo-gallery">
                                ${imgs.map(img => `
                                    <div class="gallery-item">
                                        <img src="${img}" alt="Gallery Image" loading="lazy" />
                                    </div>
                                `).join('')}
                            </div>
                        </section>`;
                        renderedSomething = true;
                    }
                } else {
                    // Generic fallback for custom sections
                    if (sec.text) {
                        html += `<section class="work-section">
                            <h2>${title}</h2>
                            <p>${parseInlineMarkdown(sec.text)}</p>
                        </section>`;
                        renderedSomething = true;
                    } else if (sec.items && Array.isArray(sec.items)) {
                        html += `<section class="work-section">
                            <h2>${title}</h2>`;
                        
                        let inList = false;
                        sec.items.forEach(item => {
                            if (typeof item === 'string') {
                                const isImage = item.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i);
                                const isVideo = item.match(/\.(mp4|webm|mov|ogg)$/i);
                                const isHeading3 = item.startsWith('**') && item.endsWith('**') && !item.slice(2, -2).includes('**');
                                const isHeading4 = item.startsWith('###');
                                const isListItem = item.startsWith('- ') || item.startsWith('・');
                                
                                if (!isListItem && inList) {
                                    html += `</ul>`;
                                    inList = false;
                                }

                                if (isImage) {
                                    html += `<div class="detail-image-inline"><img src="${item}" alt="image" loading="lazy" /></div>`;
                                } else if (isVideo) {
                                    html += `<div class="detail-image-inline"><video src="${item}" controls style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);" preload="metadata"></video></div>`;
                                } else if (isHeading3) {
                                    html += `<h3>${item.slice(2, -2)}</h3>`;
                                } else if (isHeading4) {
                                    html += `<h4>${parseInlineMarkdown(item.replace(/^###\s*/, ''))}</h4>`;
                                } else if (isListItem) {
                                    if (!inList) {
                                        html += `<ul>`;
                                        inList = true;
                                    }
                                    html += `<li>${parseInlineMarkdown(item.replace(/^[-・]\s*/, ''))}</li>`;
                                } else {
                                    html += `<p>${parseInlineMarkdown(item)}</p>`;
                                }
                            } else {
                                const isCategoryItem = item.category && item.details;
                                const isUrlItem = item.label && item.url;
                                
                                if (!(isCategoryItem || isUrlItem || item.code) && inList) {
                                    html += `</ul>`;
                                    inList = false;
                                }
                                
                                if (item.code) {
                                    const lang = item.language || 'clike';
                                    const filenameHtml = item.filename ? `<span class="code-filename">${item.filename}</span>` : '';
                                    html += `
                                        <details class="code-toggle-wrapper">
                                            <summary class="code-toggle-summary"><span>ソースコードを表示</span></summary>
                                            <div class="code-block-wrapper">
                                                <div class="code-block-header">
                                                    ${filenameHtml}
                                                    <button class="copy-code-btn" onclick="copyCode(this)">Copy</button>
                                                </div>
                                                <pre class="language-${lang}"><code class="language-${lang}">${escapeHtml(item.code)}</code></pre>
                                            </div>
                                        </details>
                                    `;
                                } else if (isCategoryItem || isUrlItem) {
                                    if (!inList) {
                                        html += `<ul>`;
                                        inList = true;
                                    }
                                    if (isCategoryItem) {
                                        html += `<li><strong>${item.category}:</strong> ${parseInlineMarkdown(item.details)}</li>`;
                                    } else {
                                        html += `<li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a></li>`;
                                    }
                                } else if (item.subtitle) {
                                    html += `<h3>${parseInlineMarkdown(item.subtitle)}</h3>`;
                                } else if (item.image) {
                                    const customStyle = item.width ? `width: ${item.width}; margin: 3.5rem auto;` : '';
                                    html += `<div class="detail-image-inline" style="${customStyle}"><img src="${item.image}" alt="image" loading="lazy" /></div>`;
                                } else if (item.images && Array.isArray(item.images)) {
                                    html += `<div class="detail-images-row" style="display: grid; grid-template-columns: repeat(${item.images.length}, 1fr); gap: 1rem; margin: 3.5rem 0;">`;
                                    item.images.forEach(img => {
                                        html += `<img src="${img}" alt="image" loading="lazy" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 30px rgba(0,0,0,0.1);" />`;
                                    });
                                    html += `</div>`;
                                } else if (item.text) {
                                    html += `<p>${parseInlineMarkdown(item.text)}</p>`;
                                }
                            }
                        });
                        
                        if (inList) {
                            html += `</ul>`;
                        }

                        html += `</section>`;
                        renderedSomething = true;
                    } else if (sec.code) {
                        const lang = sec.language || 'clike';
                        const filenameHtml = sec.filename ? `<span class="code-filename">${sec.filename}</span>` : '';
                        html += `<section class="work-section">
                            <h2>${title}</h2>
                            <details class="code-toggle-wrapper">
                                <summary class="code-toggle-summary"><span>ソースコードを表示</span></summary>
                                <div class="code-block-wrapper">
                                    <div class="code-block-header">
                                        ${filenameHtml}
                                        <button class="copy-code-btn" onclick="copyCode(this)">Copy</button>
                                    </div>
                                    <pre class="language-${lang}"><code class="language-${lang}">${escapeHtml(sec.code)}</code></pre>
                                </div>
                            </details>
                        </section>`;
                        renderedSomething = true;
                    } else if (sec.contentHtml) {
                        html += `<section class="work-section">
                            <h2>${title}</h2>
                            ${sec.contentHtml}
                        </section>`;
                        renderedSomething = true;
                    }
                }

                if (renderedSomething && ['overview', 'techStack', 'challenges'].includes(sec.type)) {
                    html += renderImage();
                }
            });

            // Add any remaining images at the end
            while (remainingImages.length > 0) {
                html += renderImage();
            }

            return html;
        }

        // Inject the detail content
        workDetail.innerHTML = `
            <div class="detail-header">
                <div class="header-content">
                    <div class="detail-meta">
                        <span class="detail-date">${project.date || ''}</span>
                        <span class="detail-client">${project.client ? '| ' + project.client : ''}</span>
                    </div>
                    <h1 class="detail-title">${project.title}</h1>
                    ${project.tags ? `
                        <div class="detail-tags">
                            ${project.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
            ${keyVisualSrc ? `
                <div class="detail-key-visual thumbnail-wrapper">
                    <img src="${keyVisualSrc}" alt="${project.title}" />
                </div>
            ` : ''}
            
            <div class="detail-content single-column">
                ${generateDetailContent(project, images)}
            </div>
        `;
        
        // Render MathJax equations dynamically
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([workDetail]).catch((err) => console.log('MathJax error:', err));
        }

        // Highlight code blocks dynamically
        if (window.Prism) {
            window.Prism.highlightAllUnder(workDetail);
        }
    }

    initShadowTracking();
});

// --- Dynamic Cursor-Following Shadow Control (Inspired by Shadow Tracking Research) ---
function initShadowTracking() {
    // Skip on touch-only devices without fine pointer
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
        return;
    }

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    const root = document.documentElement;

    function clampAlpha(a) {
        return Math.min(Math.max(a, 0), 1).toFixed(2);
    }

    function buildBoxShadow(sx, sy, ux, uy, layers, withRim = true, falloff = 1.0) {
        const { colorRGB, opacityScale, blurScale, extrudeScale } = SHADOW_CONFIG;
        const shadows = [];

        if (withRim && extrudeScale > 0) {
            // 光源側（影と逆方向）のエッジに当たるハイライト（リムライト）と暗部エッジ
            const rimX = (-ux * 1.2 * extrudeScale).toFixed(1);
            const rimY = (-uy * 1.2 * extrudeScale).toFixed(1);
            const rimAlpha = (0.72 * falloff).toFixed(2);
            const edgeAlpha = (0.18 * falloff).toFixed(2);
            shadows.push(`inset ${rimX}px ${rimY}px 1px rgba(255, 255, 255, ${rimAlpha})`);
            shadows.push(`inset ${(ux * 0.9 * extrudeScale).toFixed(1)}px ${(uy * 0.9 * extrudeScale).toFixed(1)}px 1px rgba(${colorRGB}, ${edgeAlpha})`);
        }

        layers.forEach((l) => {
            const ox = (sx * l.offset * falloff).toFixed(1);
            const oy = (sy * l.offset * falloff).toFixed(1);
            const blur = (l.blur * blurScale * (0.5 + 0.5 * falloff)).toFixed(1);
            const spread = l.spread ? ` ${l.spread}px` : '';
            const alpha = clampAlpha(l.opacity * opacityScale * falloff);
            shadows.push(`${ox}px ${oy}px ${blur}px${spread} rgba(${colorRGB}, ${alpha})`);
        });

        return shadows.join(', ');
    }

    function build3DTextShadow(sx, sy, ux, uy, config) {
        const { colorRGB, opacityScale, blurScale, extrudeScale } = SHADOW_CONFIG;
        const shadows = [];

        if (extrudeScale > 0) {
            // 1. 光源側のエッジハイライト（文字が光を受けて浮き立つ効果）
            const hlX = (-ux * 0.7 * extrudeScale).toFixed(1);
            const hlY = (-uy * 0.7 * extrudeScale).toFixed(1);
            shadows.push(`${hlX}px ${hlY}px 0px rgba(255, 255, 255, 0.7)`);

            // 2. 文字の物理的な厚み（輪郭を崩さないシャープなExtrusionステップ）
            const steps = config.extrudeSteps || 2;
            for (let i = 1; i <= steps; i++) {
                const ex = (ux * i * 0.75 * extrudeScale).toFixed(1);
                const ey = (uy * i * 0.75 * extrudeScale).toFixed(1);
                const stepAlpha = clampAlpha((0.24 - i * 0.05) * opacityScale);
                shadows.push(`${ex}px ${ey}px 0px rgba(${colorRGB}, ${stepAlpha})`);
            }
        }

        // 3. 床面に落ちる浮遊キャストシャドウ
        config.layers.forEach((l) => {
            const ox = (sx * l.offset).toFixed(1);
            const oy = (sy * l.offset).toFixed(1);
            const blur = (l.blur * blurScale).toFixed(1);
            const alpha = clampAlpha(l.opacity * opacityScale);
            shadows.push(`${ox}px ${oy}px ${blur}px rgba(${colorRGB}, ${alpha})`);
        });

        return shadows.join(', ');
    }

    function updateShadows() {
        const { lerpSpeed, lengthScale, card, pill, heading } = SHADOW_CONFIG;

        // Smooth interpolation simulating physical actuator / movable light source inertia
        currentX += (targetX - currentX) * lerpSpeed;
        currentY += (targetY - currentY) * lerpSpeed;

        // Virtual light source (p_L) moves opposite to cursor (p_H) so shadows cast toward cursor
        const lightPctX = 100 - (currentX / Math.max(window.innerWidth, 1)) * 100;
        const lightPctY = 100 - (currentY / Math.max(window.innerHeight, 1)) * 100;
        root.style.setProperty('--light-x', `${lightPctX.toFixed(1)}%`);
        root.style.setProperty('--light-y', `${lightPctY.toFixed(1)}%`);

        // 1. Media & Image Cards (Rim light + multi-layered cast shadow)
        const cards = document.querySelectorAll(
            '.profile-image, .thumbnail-wrapper, .detail-image-inline, .gallery-item, .demo-media, .iframe-container'
        );
        cards.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;

            const cx = rect.left + rect.width * 0.5;
            const cy = rect.top + rect.height * 0.5;
            const dx = currentX - cx;
            const dy = currentY - cy;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;

            const reach = Math.min(dist * card.distFactor, card.maxReach) * lengthScale;
            const sx = ux * reach;
            const sy = uy * reach;

            el.style.boxShadow = buildBoxShadow(sx, sy, ux, uy, card.layers, true, 1.0);
        });

        // 2. Interactive Pill Buttons & Skill/Award Badges (Proximity-attenuated 3D Tokens)
        const pills = document.querySelectorAll(
            '.profile-link-btn, .inline-work-link, .skill-list li, .back-link a, .award-badge, .featured-cta-btn'
        );
        const radius = pill.falloffRadius || 520;
        pills.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.bottom < -50 || rect.top > window.innerHeight + 50) return;

            const cx = rect.left + rect.width * 0.5;
            const cy = rect.top + rect.height * 0.5;
            const dx = currentX - cx;
            const dy = currentY - cy;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;

            // カーソルに近いボタン・バッジほど強く浮き上がり、遠いものは静かに接地する
            const falloff = Math.max(0.2, 1 - Math.min(dist, radius) / radius * 0.8);
            const reach = Math.min(dist * pill.distFactor, pill.maxReach) * lengthScale;
            const sx = ux * reach;
            const sy = uy * reach;

            el.style.boxShadow = buildBoxShadow(sx, sy, ux, uy, pill.layers, true, falloff);
        });

        // 3. Display Headings ONLY (Crisp 3D Typography + Floating Shadow)
        const headings = document.querySelectorAll(
            '.profile-name, .detail-title, .work-item-featured .work-title'
        );
        headings.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.bottom < -50 || rect.top > window.innerHeight + 50) return;

            const cx = rect.left + rect.width * 0.5;
            const cy = rect.top + rect.height * 0.5;
            const dx = currentX - cx;
            const dy = currentY - cy;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;

            const reach = Math.min(dist * heading.distFactor, heading.maxReach) * lengthScale;
            const sx = ux * reach;
            const sy = uy * reach;

            el.style.textShadow = build3DTextShadow(sx, sy, ux, uy, heading);
        });

        requestAnimationFrame(updateShadows);
    }

    requestAnimationFrame(updateShadows);
}

// --- Code Block Helper Functions ---
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

window.copyCode = function(button) {
    const pre = button.parentElement.nextElementSibling;
    const codeElement = pre.querySelector('code');
    if (!codeElement) return;
    const code = codeElement.innerText;
    
    function showSuccess() {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(showSuccess).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopy(code, showSuccess);
        });
    } else {
        fallbackCopy(code, showSuccess);
    }
};

function fallbackCopy(text, callback) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            callback();
        } else {
            console.error('Fallback: Copying text command was unsuccessful');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}
