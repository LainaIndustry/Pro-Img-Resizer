// Main JavaScript functionality for ProImgResizer

// DOM ready event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tool cards
    initToolCards();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize footer
    initFooter();
});

// Initialize tool cards on homepage
function initToolCards() {
    const toolsGrid = document.querySelector('.tools-grid');
    if (!toolsGrid) return;
    
    const tools = [
        {
            icon: 'fas fa-expand-arrows-alt',
            title: 'Resize',
            features: ['Image Resizer', 'Bulk Resize', 'Resize PNG', 'Resize JPG', 'Resize WebP'],
            link: 'resize.html'
        },
        {
            icon: 'fas fa-crop-alt',
            title: 'Crop',
            features: ['Crop Image', 'Crop PNG', 'Crop WebP', 'Crop JPG', 'Aspect Ratio Tools'],
            link: 'crop.html'
        },
        {
            icon: 'fas fa-compress-arrows-alt',
            title: 'Compress',
            features: ['Image Compressor', 'Compress JPEG', 'PNG Compressor', 'GIF Compressor', 'Quality Control'],
            link: 'compress.html'
        },
        {
            icon: 'fas fa-exchange-alt',
            title: 'Convert',
            features: ['PNG to SVG', 'WebP to JPG', 'PNG to JPG', 'Many more formats', 'Batch Conversion'],
            link: 'convert.html'
        },
        {
            icon: 'fas fa-magic',
            title: 'More Tools',
            features: ['Color Picker', 'Image Enlarge', 'Flip Image', 'Meme Generator', 'Rotate Image'],
            link: 'colorpicker.html'
        }
    ];
    
    let toolsHTML = '';
    
    tools.forEach(tool => {
        toolsHTML += `
            <div class="tool-card">
                <div class="tool-header">
                    <i class="${tool.icon} tool-icon"></i>
                    <h2>${tool.title}</h2>
                </div>
                <div class="tool-body">
                    <h3>${tool.title} Tools</h3>
                    <ul>
                        ${tool.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="tool-footer">
                    <a href="${tool.link}" class="btn">Use ${tool.title} Tool</a>
                </div>
            </div>
        `;
    });
    
    toolsGrid.innerHTML = toolsHTML;
}

// Initialize navigation
function initNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize footer
function initFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>ProImgResizer</h3>
                <p>Your all-in-one solution for image editing needs. Fast, secure, and easy to use.</p>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>
                </div>
            </div>
            <div class="footer-section">
                <h3>Tools</h3>
                <ul>
                    <li><a href="resize.html">Resize</a></li>
                    <li><a href="crop.html">Crop</a></li>
                    <li><a href="compress.html">Compress</a></li>
                    <li><a href="convert.html">Convert</a></li>
                    <li><a href="colorpicker.html">Color Picker</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Resources</h3>
                <ul>
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Tutorials</a></li>
                    <li><a href="#">API Documentation</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2023 ProImgResizer. All rights reserved.</p>
        </div>
    `;
}

// Initialize features section
function initFeatures() {
    const featuresSection = document.querySelector('.features');
    if (!featuresSection) return;
    
    const features = [
        {
            icon: 'fas fa-lock',
            title: 'Secure & Private',
            description: 'All processing happens in your browser. Your images are never uploaded to any server.'
        },
        {
            icon: 'fas fa-bolt',
            title: 'Fast Processing',
            description: 'Our tools are optimized for speed. Edit your images in seconds, not minutes.'
        },
        {
            icon: 'fas fa-desktop',
            title: 'No Installation',
            description: 'Use our tools directly in your browser. No software to download or install.'
        },
        {
            icon: 'fas fa-tachometer-alt',
            title: 'High Quality',
            description: 'Maintain image quality while resizing, compressing, or converting.'
        }
    ];
    
    let featuresHTML = '';
    
    features.forEach(feature => {
        featuresHTML += `
            <div class="feature">
                <i class="${feature.icon}"></i>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `;
    });
    
    featuresSection.innerHTML = featuresHTML;
}

// Image upload handler
function handleImageUpload(e, callback) {
    const file = e.target.files[0] || e.dataTransfer.files[0];
    
    if (!file || !file.type.match('image.*')) {
        alert('Please select an image file.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
    
    return file;
}

// Initialize image tool
function initImageTool(toolType) {
    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const preview = document.getElementById('image-preview');
    const placeholder = document.querySelector('.placeholder-text');
    
    if (!fileInput || !dropZone) return;
    
    // File input change event
    fileInput.addEventListener('change', function(e) {
        handleImageUpload(e, function(imageData) {
            preview.src = imageData;
            preview.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
        });
    });
    
    // Drag and drop events
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.style.background = '#e6eeff';
    });
    
    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.style.background = '';
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.style.background = '';
        
        handleImageUpload(e, function(imageData) {
            preview.src = imageData;
            preview.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
        });
    });
    
    // Browse button click
    const browseBtn = document.getElementById('browse-btn');
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }
}

// Tool-specific initialization
function initResizeTool() {
    // Implementation for resize tool
}

function initCropTool() {
    // Implementation for crop tool
}

function initCompressTool() {
    // Implementation for compress tool
}

function initConvertTool() {
    // Implementation for convert tool
}

function initColorPickerTool() {
    // Implementation for color picker tool
}

// Initialize based on current page
function initPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    switch(page) {
        case 'resize.html':
            initResizeTool();
            break;
        case 'crop.html':
            initCropTool();
            break;
        case 'compress.html':
            initCompressTool();
            break;
        case 'convert.html':
            initConvertTool();
            break;
        case 'colorpicker.html':
            initColorPickerTool();
            break;
        default:
            initFeatures();
    }
}

// Call initPage when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
