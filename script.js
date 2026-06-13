document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("loading-screen"),t=document.querySelector("nav"),n=document.querySelector(".hero"),i=document.querySelector(".hero-glow"),a=document.querySelector(".custom-cursor"),s=document.querySelector(".cursor-follower");window.addEventListener("load",(()=>{setTimeout((()=>{e.style.opacity="0",setTimeout((()=>{e.style.display="none"}),800)}),1500)})),window.addEventListener("scroll",(()=>{window.scrollY>50?t.classList.add("scrolled"):t.classList.remove("scrolled")}));const l=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&e.target.classList.add("reveal-active")}))}),{threshold:.1});document.querySelectorAll(".reveal").forEach((e=>l.observe(e))),n.addEventListener("mousemove",(e=>{const t=e.clientX,r=e.clientY;i.style.left=t+"px",i.style.top=r+"px",i.style.transform="translate(-50%, -50%)"})),document.addEventListener("mousemove",(e=>{a.style.transform=`translate3d(${e.clientX-10}px, ${e.clientY-10}px, 0)`,s.style.transform=`translate3d(${e.clientX-20}px, ${e.clientY-20}px, 0)`})),document.querySelectorAll("a, button, .service-card").forEach((e=>{e.addEventListener("mouseenter",(()=>{s.style.transform+=" scale(1.5)",s.style.background="rgba(255, 0, 0, 0.1)"})),e.addEventListener("mouseleave",(()=>{s.style.transform=s.style.transform.replace(" scale(1.5)",""),s.style.background="transparent"}))}))}));

// Category configuration
const categoryConfig = {
    medical: {
        folder: 'assets/طبي',
        displayName: 'Medical Videos'
    },
    restaurants: {
        folder: 'assets/مطاعم',
        displayName: 'Restaurant Videos'
    },
    creators: {
        folder: 'assets/صناع محتوي',
        displayName: 'Content Creator Videos'
    },
    products: {
        folder: 'assets/منتجات',
        displayName: 'Product Videos'
    }
};

// Portfolio data storage
const portfolioData = {
    medical: [
        "assets/طبي/'طبي 1.mp4",
        'assets/طبي/طبي 2.mp4', 
        'assets/طبي/طبي 3.mp4',
        'assets/طبي/طبي 4.mp4'
    ],
    restaurants: [
        'assets/مطاعم/bahr%20%23%23.mp4'
    ],
    creators: [
        'assets/صناع محتوي/1.mp4',
        'assets/صناع محتوي/2.mp4',
        'assets/صناع محتوي/3mp4.mp4',
        'assets/صناع محتوي/4.mp4',
        'assets/صناع محتوي/5.mp4',
        'assets/صناع محتوي/8.mp4',
        'assets/صناع محتوي/9.mp4',
        'assets/صناع محتوي/10.mp4',
        'assets/صناع محتوي/Comp 2.mp4',
        'assets/صناع محتوي/iphone-.mp4'
    ],
    products: [
        'assets/منتجات/vidssave.com%20NILA%20ZARAA%20%D9%85%D9%88%D9%86%D8%AA%D8%A7%D8%AC%20%D8%AA%D8%B3%D9%88%D9%8A%D9%82%D9%8A%20%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%20720P.mp4',
        'assets/منتجات/vidssave.com%20serm%20%23%D9%85%D9%88%D9%86%D8%AA%D8%A7%D8%AC%20%23%D8%A7%D9%83%D8%B3%D8%A8%D9%84%D9%88%D8%B1%20%23%D9%85%D9%88%D9%86%D8%AA%D8%A7%D8%AC_%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%20%23%D9%85%D9%88%D9%86%D8%AA%D8%A7%D8%AC_%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%20%23%D8%A7%D9%81%D9%84%D8%A7%D9%85%20%23cinematic%20%23video%20%23%D8%B3%D9%85%D9%83%20%23%D8%B1%D9%8A%D9%84%D8%B2%20%23%D8%AA%D8%B1%D9%86%D8%AF%20480P.mp4',
        'assets/منتجات/vidssave.com%20%D8%A7%D9%84%D9%86%D8%A7%D8%AF%D9%8A%20%D8%A7%D9%84%D8%A7%D9%87%D9%84%D9%8A%20720P.mp4',
        'assets/منتجات/vidssave.com%20%D9%81%D9%8A%D8%AF%D9%8A%D9%88%20%D8%AA%D8%B3%D9%88%D9%8A%D9%82%D9%8A%20%D8%A7%D8%AD%D8%AA%D8%B1%D8%A7%D9%81%D9%8A%20480P.mp4',
        'assets/منتجات/vidssave.com%20%D9%85%D9%86%20%D8%A7%D8%B9%D9%85%D8%A7%D9%84%D9%8A%20%D9%84%D8%AF%D9%88%D9%81%D8%A7%20720P.mp4',
        'assets/منتجات/vidssave.com%20%D9%85%D9%86%D8%B4%D8%B1%20%20%D9%86%D9%88%D8%B1%20%D8%B3%D8%AA%D9%8A%D9%84%20720P.mp4'
    ]
};

// Scan folders and populate video data (Note: Fetching folders requires server-side directory listing)
async function scanVideosFromFolder(folderPath, targetId) {
    try {
        const response = await fetch(folderPath);
        if (!response.ok) return;
        
        const text = await response.text();
        const parser = new DOMParser();
        const html = parser.parseFromString(text, 'text/html');
        const links = html.querySelectorAll('a[href$=".mp4"]');
        
        if (links.length === 0) return;

        // Process all videos and check orientation
        const videoPromises = Array.from(links).map(async link => {
            const fileName = link.href.split('/').pop();
            const videoUrl = `${folderPath}/${fileName}`; // folderPath is already safe-ish
            const decodedName = decodeURIComponent(fileName).replace('.mp4', '');
            
            // Create video element to check orientation
            const vid = document.createElement('video');
            vid.src = videoUrl;
            
            // Wait for metadata to load
            await new Promise(resolve => {
                vid.onloadedmetadata = resolve;
                vid.onerror = () => resolve(null);
                vid.load();
            });
            
            if (vid.videoHeight > 0) {
                return {
                    src: videoUrl,
                    title: decodedName.replace(/-/g, ' ').replace(/_/g, ' '),
                    isPortrait: vid.videoHeight > vid.videoWidth
                };
            }
            return null;
        });

        // Filter out null entries
        const scannedVideos = (await Promise.all(videoPromises)).filter(v => v !== null);
        if (scannedVideos.length > 0) {
            // Append scanned videos to hardcoded ones, avoiding duplicates
            const existingSrcs = new Set(portfolioData[targetId].map(v => typeof v === 'string' ? v : v.src));
            scannedVideos.forEach(v => {
                if (!existingSrcs.has(v.src)) {
                    portfolioData[targetId].push(v);
                    existingSrcs.add(v.src);
                }
            });
        }
    } catch (error) {
        console.warn(`Could not auto-scan videos from ${folderPath}. Using hardcoded fallback.`);
    }
}

// Initialize video data
document.addEventListener('DOMContentLoaded', () => {
    Object.entries(categoryConfig).forEach(([id, config]) => {
        scanVideosFromFolder(config.folder, id);
    });
});

// Portfolio Gallery Logic
function openGallery(categoryId) {
    const categories = document.getElementById('portfolioCategories');
    const galleryWrapper = document.getElementById('videoGalleryWrapper');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Update target category title
    galleryTitle.textContent = categoryConfig[categoryId].displayName;

    // Populate Gallery Grid
    const categoryVideos = portfolioData[categoryId] || [];
    
    if (categoryVideos.length > 0) {
        galleryGrid.innerHTML = categoryVideos.map((video, index) => {
            // Handle both string paths and video objects
            const src = typeof video === 'string' ? video : video.src;
            
            // Check if it's a YouTube video
            const ytRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
            const ytMatch = src.match(ytRegex);
            const videoId = (ytMatch && ytMatch[2].length === 11) ? ytMatch[2] : null;

            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
                return `
                    <div class="video-item glass-panel reveal reveal-active portrait">
                        <iframe 
                            src="${embedUrl}" 
                            title="YouTube video player" 
                            frameborder="0" 
                            style="width:100%; height:100%; border-radius: 12px; pointer-events: all;"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
            }

            return `
                <div class="video-item glass-panel reveal reveal-active portrait">
                    <video controls preload="metadata" playsinline style="width:100%; height:100%; object-fit: contain; background: #000;">
                        <source src="${src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `;
        }).join('');
    } else {
        // Show empty state if no videos
        galleryGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0; color: var(--text-gray);">
                <i class="fa-solid fa-video-slash" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p style="font-size: 1.2rem;">لم يتم رفع فيديوهات في هذا القسم بعد.</p>
            </div>
        `;
    }

    // Hide categories with animation
    categories.style.opacity = '0';
    setTimeout(() => {
        categories.style.display = 'none';
        
        // Show gallery wrapper
        galleryWrapper.classList.remove('hidden');
        setTimeout(() => {
            galleryWrapper.style.opacity = '1';
            // Scroll to top of gallery
            galleryWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }, 400);
}

function closeGallery() {
    const categories = document.getElementById('portfolioCategories');
    const galleryWrapper = document.getElementById('videoGalleryWrapper');
    
    // Pause all playing videos
    const videos = galleryWrapper.querySelectorAll('video');
    videos.forEach(video => {
        if(!video.paused) {
            video.pause();
        }
    });

    // Hide gallery wrapper with animation
    galleryWrapper.style.opacity = '0';
    setTimeout(() => {
        galleryWrapper.classList.add('hidden');
        
        // Show categories
        categories.style.display = 'grid';
        setTimeout(() => {
            categories.style.opacity = '1';
            // Scroll back to portfolio section
            document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }, 400);
}



