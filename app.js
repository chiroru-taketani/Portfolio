document.addEventListener('DOMContentLoaded', () => {
    // Check if portfolioData is available
    if (typeof portfolioData === 'undefined') {
        console.error('Error: portfolioData is not defined.');
        return;
    }

    const worksGrid = document.getElementById('works-grid');
    const workDetail = document.getElementById('work-detail');
    
    // --- Index Page Logic ---
    if (worksGrid) {
        const htmlContent = portfolioData.map(item => `
            <li class="work-item">
                <a href="${item.link}">
                    <div class="thumbnail-wrapper">
                        <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" />
                    </div>
                    <p class="work-title">${item.title}</p>
                    ${item.shortDescription ? `<p class="work-short-desc">${item.shortDescription}</p>` : ''}
                </a>
            </li>
        `).join('');

        worksGrid.innerHTML = htmlContent;
    }

    // --- Detail Page Logic ---
    if (workDetail) {
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
        document.title = `${project.title} - GUPON MOTION DESIGN`;

        const images = project.images ? [...project.images] : (project.thumbnail ? [project.thumbnail] : []);
        // 最初の画像をキービジュアルとして取得
        const keyVisualSrc = images.length > 0 ? images.shift() : null;
        
        // 背景画像用のスタイルを生成（暗いオーバーレイを重ねて文字を見やすくする）
        const headerStyle = keyVisualSrc ? `background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url('${keyVisualSrc}');` : '';
        const headerClass = keyVisualSrc ? 'detail-header hero-header' : 'detail-header';

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
                html += `<div class="work-section"><p>${project.description || ''}</p></div>`;
                while (remainingImages.length > 0) {
                    html += renderImage();
                }
                return html;
            }

            const c = project.content;

            const defTitles = typeof sectionTitles !== 'undefined' ? sectionTitles : {
            };

            let sections = [];
            if (Array.isArray(c)) {
                sections = c;
            } else {
                sections = Object.keys(c).map(key => {
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
                            ${customSec.contentHtml || (customSec.text ? `<p>${customSec.text}</p>` : '')}
                        </section>`;
                    });
                    return;
                }

                // Get title from data.js sectionTitles, or sec.title, or fallback to the key itself
                const globalTitles = typeof sectionTitles !== 'undefined' ? sectionTitles : {};
                let title = sec.title || globalTitles[sec.type] || sec.type;
                let renderedSomething = false;

                if (sec.type === 'overview') {
                    const desc = sec.description || sec.text || '';
                    const isVideo = sec.demoMedia ? sec.demoMedia.match(/\.(mp4|webm|mov|ogg)$/i) : false;
                    const ytMatch = sec.demoMedia ? sec.demoMedia.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/) : null;
                    html += `<section class="work-section">
                        <h2>${title}</h2>
                        ${sec.catchphrase ? `<h3>${sec.catchphrase}</h3>` : ''}
                        ${sec.demoMedia ? (ytMatch && ytMatch[1] ?
                            `<div class="video-embed"><div class="iframe-container"><iframe src="https://www.youtube.com/embed/${ytMatch[1]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div></div>` :
                            (isVideo ? 
                            `<div class="demo-media"><video src="${sec.demoMedia}" controls style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);" preload="metadata"></video></div>` : 
                            `<div class="demo-media"><img src="${sec.demoMedia}" alt="Demo" loading="lazy" /></div>`
                        )) : ''}
                        ${desc ? `<p>${desc}</p>` : ''}
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
                            <p>${sec.text}</p>
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
                                const isHeading3 = item.startsWith('**') && item.endsWith('**');
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
                                    html += `<h4>${item.replace(/^###\s*/, '')}</h4>`;
                                } else if (isListItem) {
                                    if (!inList) {
                                        html += `<ul>`;
                                        inList = true;
                                    }
                                    html += `<li>${item.replace(/^[-・]\s*/, '')}</li>`;
                                } else {
                                    // Make sure text that was meant to be heading but has typo (like ending in **) can still just render as text
                                    html += `<p>${item}</p>`;
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
                                        html += `<li><strong>${item.category}:</strong> ${item.details}</li>`;
                                    } else {
                                        html += `<li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label}</a></li>`;
                                    }
                                } else if (item.subtitle) {
                                    html += `<h3>${item.subtitle}</h3>`;
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
                                    html += `<p>${item.text}</p>`;
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
            <div class="${headerClass}" style="${headerStyle}">
                <div class="header-content">
                    <h1 class="detail-title">${project.title}</h1>
                    <div class="detail-meta">
                        <span class="detail-date">${project.date || ''}</span>
                        <span class="detail-client">${project.client ? '| ' + project.client : ''}</span>
                    </div>
                </div>
            </div>
            
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
});

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
