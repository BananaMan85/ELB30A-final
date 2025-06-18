const SITE_CONFIG = {
            title: "SAGE News",
            subtitle: "Your most trusted source of global news",
            headerColor: [30, 50, 80],
            backgroundColor: [240, 240, 245],
            accentColor: [200, 50, 50]
        };

        const articles = [
            {
                headline: "Poilievre Sneaks into House of Commons, Disguises as Coat Rack",
                summary: "Pierre Poilievre seen sneaking into House of Commons and blending in as a coat rack",
                category: "Politics",
                author: "William Sherwood",
                date: "June 17, 2025",
                image: "images/poilievre.jpg",
                content: "articles/poilievre.txt"
            },
            {
                headline: "Trump Seen Picking Flower Petals to Decide on Tariffs",
                summary: "New technological innovations are transforming how we work and live in unprecedented ways.",
                category: "Politics", 
                author: "William Sherwood",
                date: "June 16, 2025",
                image: "images/trump.jpg",
                content: "articles/flower.txt"
            },
            {
                headline: "Pete Hegseth's New App Streamlines Military Leaks",
                summary: "Exciting matches conclude with surprising outcomes as teams battle for the championship title.",
                category: "Politics",
                author: "William Sherwood",
                date: "June 15, 2025", 
                image: "images/hegseth.jpg",
                content: "articles/hegseth.txt"
            },
            {
                headline: "Jerome Powell Points at Stciker of Trump Every Time A Tariff Question is Asked",
                summary: "Meteorologists warn of changing weather patterns affecting the region this week.",
                category: "Politics",
                author: "William Sherwood",
                date: "June 14, 2025",
                image: "images/powell.jpg",
                content: `articles/powell.txt`
            },
            {
                headline: "Elon Musk Involved In a Series of Rasputin-Adjacent Incidents",
                summary: "Meteorologists warn of changing weather patterns affecting the region this week.",
                category: "Politics",
                author: "William Sherwood",
                date: "June 14, 2025",
                image: "images/musk.jpg",
                content: `articles/rasputin.txt`
            },
            {
                headline: `J.D. Vance "Excited" About Getting Two Christmases Following Trump and Musk Break Up`,
                summary: "Meteorologists warn of changing weather patterns affecting the region this week.",
                category: "Politics",
                author: "William Sherwood",
                date: "June 14, 2025",
                image: "images/vance.jpg",
                content: `articles/vance.txt`
            }
        ];

        // ============= END CUSTOMIZATION SECTION =============

        let currentPage = 'home';
        let selectedArticle = null;
        let scrollY = 0;
        let images = {};

        function preload() {
            // Preload article images and text
            articles.forEach((article, index) => {
                images[index] = loadImage(article.image);
                article.content = loadStrings(article.content);
            });

            
        }

        function setup() {
            createCanvas(windowWidth, windowHeight);
            textAlign(LEFT, TOP);

            for (let article of articles){
              // article.content = join(article.content, '');
            }
        }

        function draw() {
            background(SITE_CONFIG.backgroundColor);
            
            // Apply scroll offset
            push();
            translate(0, -scrollY);
            
            if (currentPage === 'home') {
                drawHomePage();
            } else if (currentPage === 'article') {
                drawArticlePage();
            }
            
            pop();
            
            // Draw fixed header
            drawHeader();
        }

        function drawHeader() {
            // Header background
            fill(SITE_CONFIG.headerColor);
            noStroke();
            rect(0, 0, width, 80);
            
            // Site title
            fill(255);
            textSize(24);
            textStyle(BOLD);
            text(SITE_CONFIG.title, 20, 20);
            
            // Subtitle
            textSize(14);
            textStyle(NORMAL);
            text(SITE_CONFIG.subtitle, 20, 50);
            
            // Home button (if not on home page)
            if (currentPage !== 'home') {
                fill(255, 255, 255, 150);
                rect(width - 100, 20, 80, 40, 5);
                fill(SITE_CONFIG.headerColor);
                textAlign(CENTER, CENTER);
                textSize(14);
                text("← Home", width - 60, 40);
                textAlign(LEFT, TOP);
            }
        }

        function drawHomePage() {
            let yPos = 100; // Start below header
            
            // Main headline
            if (articles.length > 0) {
                drawFeaturedArticle(articles[0], yPos);
                yPos += 320;
            }
            
            // Article grid
            fill(50);
            textSize(20);
            textStyle(BOLD);
            text("Latest Stories", 20, yPos);
            yPos += 40;
            
            // Draw article cards in grid
            let cols = floor(width / 320);
            if (cols < 1) cols = 1;
            let cardWidth = (width - 40 - (cols - 1) * 20) / cols;
            
            for (let i = 1; i < articles.length; i++) {
                let col = (i - 1) % cols;
                let row = floor((i - 1) / cols);
                let x = 20 + col * (cardWidth + 20);
                let y = yPos + row * 280;
                
                drawArticleCard(articles[i], x, y, cardWidth, i);
            }
        }

        function drawFeaturedArticle(article, y) {
            // Featured article background
            fill(255);
            stroke(200);
            rect(20, y, width - 40, 300, 10);
            
            // Image
            if (images[0]) {
                let imgWidth = min(400, (width - 60) / 2);
                let imgHeight = (imgWidth * images[0].height) / images[0].width;
                if (imgHeight > 200) {
                    imgHeight = 200;
                    imgWidth = (imgHeight * images[0].width) / images[0].height;
                }
                image(images[0], 30, y + 20, imgWidth, imgHeight);
            }
            
            // Text content
            let textX = width > 800 ? 450 : 30;
            let textY = width > 800 ? y + 30 : y + 240;
            let textWidth = width > 800 ? width - 480 : width - 80;
            
            // Category
            fill(SITE_CONFIG.accentColor);
            textSize(12);
            textStyle(BOLD);
            text(article.category.toUpperCase(), textX, textY);
            
            // Headline
            fill(30);
            textSize(24);
            textStyle(BOLD);
            text(article.headline, textX, textY + 20, textWidth, 100);
            
            // Summary
            textSize(14);
            textStyle(NORMAL);
            fill(80);
            text(article.summary, textX, textY + 90, textWidth, 60);
            
            // Author and date
            textSize(12);
            fill(120);
            text(`By ${article.author} • ${article.date}`, textX, textY + 170);
        }

        function drawArticleCard(article, x, y, w, index) {
            // Card background
            fill(255);
            stroke(200);
            rect(x, y, w, 260, 8);
            
            // Image
            if (images[index]) {
                let imgHeight = 120;
                image(images[index], x + 10, y + 10, w - 20, imgHeight);
            }
            
            // Category
            fill(SITE_CONFIG.accentColor);
            textSize(10);
            textStyle(BOLD);
            text(article.category.toUpperCase(), x + 15, y + 145);
            
            // Headline
            fill(30);
            textSize(16);
            textStyle(BOLD);
            text(article.headline, x + 15, y + 165, w - 30, 60);
            
            // Author and date
            textSize(11);
            textStyle(NORMAL);
            fill(120);
            text(`${article.author} • ${article.date}`, x + 15, y + 235);
        }

        function drawArticlePage() {
            if (!selectedArticle) return;
            
            let article = selectedArticle;
            let yPos = 100;
            
            // Article header
            fill(255);
            stroke(200);
            rect(20, yPos, width - 40, 400, 10);
            
            // Category
            fill(SITE_CONFIG.accentColor);
            textSize(14);
            textStyle(BOLD);
            text(article.category.toUpperCase(), 40, yPos + 30);
            
            // Headline
            fill(30);
            textSize(32);
            textStyle(BOLD);
            text(article.headline, 40, yPos + 60, width - 100, 120);
            
            // Author and date
            textSize(14);
            textStyle(NORMAL);
            fill(120);
            text(`By ${article.author} • ${article.date}`, 40, yPos + 200);
            
            // Article image
            if (images[articles.indexOf(article)]) {
                let imgWidth = min(600, width - 100);
                let imgHeight = (imgWidth * images[articles.indexOf(article)].height) / images[articles.indexOf(article)].width;
                image(images[articles.indexOf(article)], 40, yPos + 240, imgWidth, imgHeight);
                yPos += imgHeight;
            }
            
            yPos += 280;
            
            // Calculate content height needed
            textSize(26);
            let contentHeight = getTextHeight(article.content, width - width/3, 16);
            let minContentHeight = 300;
            let actualContentHeight = max(minContentHeight, contentHeight + 60); // 60 for padding
            
            // Article content box
            fill(255);
            stroke(200);
            rect(20, yPos, width - 40, actualContentHeight, 10);
            
            let txt = article.content.join('\n');
            fill(50);
            textSize(26);
            textStyle(NORMAL);
            text(txt, 40, yPos + 30, width - width/3);
        }
        
        function getTextHeight(txt, maxWidth, textSz) {
            // Estimate text height by counting lines, handling explicit line breaks
            textSize(textSz);
            
            // First split by line breaks
            let paragraphs = txt;
            let totalLines = 0;
            
            for (let paragraph of paragraphs) {
                if (paragraph.trim() === '') {
                    // Empty line
                    totalLines += 3;
                    continue;
                }
                
                // Count wrapped lines within this paragraph
                let words = paragraph.split(' ');
                let lines = 1;
                let currentLine = '';
                
                for (let word of words) {
                    let testLine = currentLine + word + ' ';
                    if (textWidth(testLine) > maxWidth && currentLine !== '') {
                        lines++;
                        currentLine = word + ' ';
                    } else {
                        currentLine = testLine;
                    }
                }
                
                totalLines += lines;
            }
            
            return totalLines * (textSz * 1.4); // 1.4 is line height multiplier for better spacing
        }

        function mousePressed() {
            if (currentPage === 'home') {
                // Check featured article click
                if (mouseY > 100 && mouseY < 400 && articles.length > 0) {
                    selectedArticle = articles[0];
                    currentPage = 'article';
                    scrollY = 0;
                    return;
                }
                
                // Check article cards
                let yStart = 460;
                let cols = floor(width / 320);
                if (cols < 1) cols = 1;
                let cardWidth = (width - 40 - (cols - 1) * 20) / cols;
                
                for (let i = 1; i < articles.length; i++) {
                    let col = (i - 1) % cols;
                    let row = floor((i - 1) / cols);
                    let x = 20 + col * (cardWidth + 20);
                    let y = yStart + row * 280 - scrollY;
                    
                    if (mouseX > x && mouseX < x + cardWidth && 
                        mouseY > y && mouseY < y + 260) {
                        selectedArticle = articles[i];
                        currentPage = 'article';
                        scrollY = 0;
                        return;
                    }
                }
            } else if (currentPage === 'article') {
                // Check home button
                if (mouseX > width - 100 && mouseX < width - 20 && 
                    mouseY > 20 && mouseY < 60) {
                    currentPage = 'home';
                    scrollY = 0;
                }
            }
        }

        function mouseWheel(event) {
            scrollY += event.delta;
            
            // Calculate max scroll based on content
            let maxScroll;
            if (currentPage === 'home') {
                maxScroll = max(0, 600 + ceil((articles.length - 1) / floor(width / 320)) * 280 - height);
            } else if (currentPage === 'article' && selectedArticle) {
                // Calculate actual article content height
                textSize(16);
                let contentHeight = getTextHeight(selectedArticle.content, width - 100, 16);
                let minContentHeight = 300;
                let actualContentHeight = max(minContentHeight, contentHeight + 60);
                let totalArticleHeight = 500 + 280 + actualContentHeight; // header + image area + content
                maxScroll = max(0, totalArticleHeight - height + 100); // +100 for bottom padding
            } else {
                maxScroll = 0;
            }
            
            scrollY = constrain(scrollY, 0, maxScroll);
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
        }

        function keyPressed() {
            // ESC to go back to home
            if (key === 'Escape' && currentPage === 'article') {
                currentPage = 'home';
                scrollY = 0;
            }
        }
