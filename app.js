// ===== FlowPrompt - Simple Version =====

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('FlowPrompt initialized');

    // ===== DOM Elements =====
    const generateBtn = document.getElementById('generateBtn');
    const outputSection = document.getElementById('outputSection');
    const promptsContainer = document.getElementById('promptsContainer');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const toast = document.getElementById('toast');
    const langBtns = document.querySelectorAll('.lang-btn');

    // Form inputs
    const characterSelect = document.getElementById('characterSelect');
    const characterInput = document.getElementById('characterInput');
    const costumeInput = document.getElementById('costumeInput');
    const locationSelect = document.getElementById('locationSelect');
    const locationInput = document.getElementById('locationInput');
    const dialogueSelect = document.getElementById('dialogueSelect');
    const dialogueInput = document.getElementById('dialogueInput');
    const sceneCountSelect = document.getElementById('sceneCountSelect');
    const timeSelect = document.getElementById('timeSelect');
    const videoTitleInput = document.getElementById('videoTitleInput');
    const secondaryInput = document.getElementById('secondaryInput');
    const speechTextInput = document.getElementById('speechTextInput');
    const dialogueLanguageSelect = document.getElementById('dialogueLanguageSelect');

    // Image uploads
    const uploadArea1 = document.getElementById('uploadArea1');
    const imageInput1 = document.getElementById('imageInput1');
    const uploadContent1 = document.getElementById('uploadContent1');
    const imagePreview1 = document.getElementById('imagePreview1');
    const previewImg1 = document.getElementById('previewImg1');
    const removeImage1 = document.getElementById('removeImage1');

    const uploadArea2 = document.getElementById('uploadArea2');
    const imageInput2 = document.getElementById('imageInput2');
    const uploadContent2 = document.getElementById('uploadContent2');
    const imagePreview2 = document.getElementById('imagePreview2');
    const previewImg2 = document.getElementById('previewImg2');
    const removeImage2 = document.getElementById('removeImage2');

    let currentLanguage = 'en';
    let currentTab = 'video'; // 'video' or 'image'

    // Checkbox for no dialog text
    const noDialogTextCheckbox = document.getElementById('noDialogText');

    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');

    // ===== Tab Switcher =====
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.dataset.tab;
            console.log('Tab switched to:', currentTab);

            // Update UI labels based on tab
            updateUIForTab(currentTab);
        });
    });

    // ===== Update UI for Tab =====
    function updateUIForTab(tab) {
        const titleLabel = document.querySelector('label[for="videoTitleInput"]');
        const titleInput = document.getElementById('videoTitleInput');
        const sceneLabel = document.querySelector('label[for="sceneCountSelect"]');
        const durationGroup = document.getElementById('durationSelect')?.closest('.input-group');

        if (tab === 'image') {
            if (titleLabel) titleLabel.innerHTML = '<span class="icon">🖼️</span> Image Title / Description';
            if (titleInput) titleInput.placeholder = 'e.g., Portrait of a woman in a garden, Landscape at sunset';
            if (sceneLabel) sceneLabel.innerHTML = '<span class="icon">🎞️</span> Number of Images';
            if (durationGroup) durationGroup.style.display = 'none';
        } else {
            if (titleLabel) titleLabel.innerHTML = '<span class="icon">🎬</span> Video Title / Story Context';
            if (titleInput) titleInput.placeholder = 'e.g., A romantic date at the beach, Adventure in the mountains';
            if (sceneLabel) sceneLabel.innerHTML = '<span class="icon">🎞️</span> Number of Scenes';
            if (durationGroup) durationGroup.style.display = 'block';
        }
    }

    // ===== Character Presets =====
    const characterPresets = {
        'young-woman': 'a beautiful young woman in her twenties',
        'young-man': 'a handsome young man in his twenties',
        'mature-woman': 'an elegant mature woman in her forties',
        'mature-man': 'a distinguished mature man in his forties',
        'teen-girl': 'a teenage girl around 16 years old',
        'teen-boy': 'a teenage boy around 16 years old',
        'elderly-woman': 'an elegant elderly woman',
        'elderly-man': 'a distinguished elderly man',
        'child-girl': 'a young girl around 10 years old',
        'child-boy': 'a young boy around 10 years old'
    };

    // ===== Location Presets =====
    const locationPresets = {
        'beach': 'at a beautiful beach with ocean waves and golden sand',
        'cafe': 'inside a cozy cafe with warm lighting',
        'park': 'in a peaceful park with green trees',
        'urban': 'on a modern city street',
        'forest': 'in a natural forest with tall trees',
        'mountain': 'on scenic mountains with beautiful views',
        'studio': 'in a professional studio with clean background',
        'home': 'inside a comfortable home interior',
        'office': 'in a professional office workspace'
    };

    // ===== Dialogue Presets =====
    const dialoguePresets = {
        'talking': 'having a conversation together',
        'laughing': 'laughing and smiling joyfully',
        'walking': 'walking side by side',
        'holding-hands': 'holding hands romantically',
        'hugging': 'embracing in a warm hug',
        'looking': 'gazing at each other',
        'dancing': 'dancing together gracefully',
        'eating': 'enjoying a meal together'
    };

    // ===== Scene Types =====
    const sceneTypes = ['Opening Shot', 'Build-up', 'Development', 'Climax', 'Closing Shot'];

    // ===== ENHANCED Camera Movements by Narrative Tone =====
    const camerasByTone = {
        'comedy': [
            'quick whip pan with comedic timing',
            'exaggerated zoom-in on facial reaction',
            'handheld shaky cam for chaos effect',
            'sudden freeze frame with comedic pause',
            'fast dolly zoom (vertigo effect) for shock comedy',
            'snap zoom to reaction shot',
            'dutch angle for absurd moments'
        ],
        'serious': [
            'slow deliberate push-in building tension',
            'static locked-off shot for gravity',
            'slow crane revealing environment',
            'intimate close-up with shallow depth',
            'solemn tracking shot',
            'contemplative orbital shot',
            'low angle shot conveying authority'
        ],
        'dramatic': [
            'sweeping epic crane shot',
            'dramatic dolly zoom (Hitchcock effect)',
            'intense close-up capturing raw emotion',
            'slow motion hero shot',
            'dynamic arc shot around subject',
            'powerful low angle ascending shot',
            'climactic push-in with rising intensity'
        ],
        'mixed': [
            'versatile tracking shot adapting to mood',
            'steadicam following action naturally',
            'smooth dolly with emotional weight',
            'cinematic crane revealing story',
            'intimate handheld for authenticity',
            'dynamic gimbal movement',
            'artistic camera movement matching emotion'
        ]
    };

    // Fallback cameras for backwards compatibility
    const cameras = camerasByTone['mixed'];

    // ===== NARRATIVE TONE Presets =====
    const narrativeTones = {
        'comedy': {
            name: 'Comedy',
            icon: '😂',
            description: 'Funny, witty, absurd moments',
            pacing: 'upbeat with sudden pauses for comedic timing',
            elements: ['physical comedy', 'funny expressions', 'absurd situations', 'witty reactions', 'slapstick moments'],
            transitions: ['smash cut for comedic effect', 'whip pan to reaction', 'freeze frame with record scratch']
        },
        'serious': {
            name: 'Serious',
            icon: '😐',
            description: 'Thoughtful, contemplative, meaningful',
            pacing: 'measured and deliberate with contemplative pauses',
            elements: ['subtle gestures', 'meaningful glances', 'weighted silence', 'internal conflict', 'emotional depth'],
            transitions: ['slow fade', 'dissolve with meaning', 'match cut for emphasis']
        },
        'dramatic': {
            name: 'Dramatic',
            icon: '🎭',
            description: 'Intense, emotional, powerful',
            pacing: 'building intensity with explosive climax',
            elements: ['intense emotions', 'powerful confrontations', 'emotional breakdowns', 'triumphant moments', 'heart-wrenching scenes'],
            transitions: ['dramatic slow motion', 'impactful cut to black', 'audio crescendo with visual peak']
        },
        'mixed': {
            name: 'Mixed',
            icon: '🎬',
            description: 'Balanced mix of comedy, drama, and emotion',
            pacing: 'dynamic rhythm alternating between tones',
            elements: ['emotional range', 'tonal shifts', 'comedic relief', 'dramatic peaks', 'genuine moments'],
            transitions: ['varied transitions matching mood', 'seamless tone shifts', 'motivated cuts']
        }
    };

    // ===== STORY ARC Templates =====
    const storyArcs = {
        'comedy': [
            { phase: 'setup', mood: 'normal', twist: 'something goes hilariously wrong' },
            { phase: 'escalation', mood: 'chaotic', twist: 'situation gets absurdly worse' },
            { phase: 'peak', mood: 'maximum chaos', twist: 'unexpected comedic resolution' },
            { phase: 'payoff', mood: 'satisfied', twist: 'funny callback or punchline' }
        ],
        'serious': [
            { phase: 'establishment', mood: 'contemplative', twist: 'underlying tension revealed' },
            { phase: 'exploration', mood: 'deepening', twist: 'emotional truth emerges' },
            { phase: 'confrontation', mood: 'intense', twist: 'characters face reality' },
            { phase: 'resolution', mood: 'reflective', twist: 'meaningful conclusion' }
        ],
        'dramatic': [
            { phase: 'calm before storm', mood: 'anticipation', twist: 'something shatters the peace' },
            { phase: 'rising action', mood: 'tension building', twist: 'stakes escalate dramatically' },
            { phase: 'climax', mood: 'explosive emotion', twist: 'emotional breakthrough or breakdown' },
            { phase: 'aftermath', mood: 'catharsis', twist: 'transformation or acceptance' }
        ],
        'mixed': [
            { phase: 'introduction', mood: 'lighthearted', twist: 'comedic moment with hint of depth' },
            { phase: 'development', mood: 'shifting', twist: 'tone becomes more serious' },
            { phase: 'turning point', mood: 'dramatic', twist: 'emotional revelation' },
            { phase: 'resolution', mood: 'balanced', twist: 'ending with humor and heart' }
        ]
    };

    // ===== Time Lighting =====
    const timeLighting = {
        'day': 'bright natural daylight with crisp shadows',
        'golden': 'warm golden hour lighting with lens flares',
        'night': 'atmospheric night lighting with neon reflections',
        'morning': 'soft ethereal morning light with gentle mist',
        'overcast': 'moody diffused light with dramatic clouds'
    };

    // ===== Image Upload Handlers =====
    function setupImageUpload(area, input, content, preview, img, removeBtn) {
        if (!area || !input) return;

        area.addEventListener('click', () => input.click());

        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });

        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });

        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleImage(file, content, preview, img);
            }
        });

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleImage(file, content, preview, img);
            }
        });

        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                input.value = '';
                if (content) content.style.display = 'flex';
                if (preview) preview.style.display = 'none';
            });
        }
    }

    function handleImage(file, content, preview, img) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (img) img.src = e.target.result;
            if (content) content.style.display = 'none';
            if (preview) preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Setup both image uploads
    setupImageUpload(uploadArea1, imageInput1, uploadContent1, imagePreview1, previewImg1, removeImage1);
    setupImageUpload(uploadArea2, imageInput2, uploadContent2, imagePreview2, previewImg2, removeImage2);

    // ===== Custom Input Toggle =====
    function setupCustomToggle(select, input) {
        if (!select || !input) return;
        select.addEventListener('change', function () {
            if (this.value === 'custom') {
                input.style.display = 'block';
                input.focus();
            } else {
                input.style.display = 'none';
            }
        });
    }

    setupCustomToggle(characterSelect, characterInput);
    setupCustomToggle(locationSelect, locationInput);
    setupCustomToggle(dialogueSelect, dialogueInput);

    // ===== Language Switcher =====
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLanguage = btn.dataset.lang;
        });
    });

    // ===== Generate Button =====
    if (generateBtn) {
        generateBtn.addEventListener('click', function () {
            console.log('Generate button clicked');
            generatePrompts();
        });
    }

    // ===== Copy All Button =====
    if (copyAllBtn) {
        copyAllBtn.addEventListener('click', function () {
            const prompts = promptsContainer.querySelectorAll('.prompt-text');
            let allText = '';
            prompts.forEach((p, i) => {
                allText += `Scene ${i + 1}:\n${p.textContent}\n\n`;
            });
            copyToClipboard(allText.trim());
            showToast('All prompts copied!');
        });
    }

    // ===== Generate Prompts Function =====
    function generatePrompts() {
        console.log('Generating prompts...');

        // Get character
        let character = '';
        const charValue = characterSelect ? characterSelect.value : 'young-woman';
        if (charValue === 'custom' && characterInput) {
            character = characterInput.value.trim() || 'a person';
        } else {
            character = characterPresets[charValue] || 'a beautiful young woman';
        }

        // Get costume
        const costume = costumeInput ? costumeInput.value.trim() : '';

        // Get location
        let location = '';
        const locValue = locationSelect ? locationSelect.value : '';
        if (locValue === 'custom' && locationInput) {
            location = locationInput.value.trim();
        } else if (locValue) {
            location = locationPresets[locValue] || locValue;
        }

        // Get dialogue/interaction
        let dialogue = '';
        const dialogValue = dialogueSelect ? dialogueSelect.value : '';
        if (dialogValue === 'custom' && dialogueInput) {
            dialogue = dialogueInput.value.trim();
        } else if (dialogValue) {
            dialogue = dialoguePresets[dialogValue] || dialogValue;
        }

        // Get other values
        const videoTitle = videoTitleInput ? videoTitleInput.value.trim() : '';
        const secondary = secondaryInput ? secondaryInput.value.trim() : '';
        const speechText = speechTextInput ? speechTextInput.value.trim() : '';
        const timeOfDay = timeSelect ? timeSelect.value : 'day';
        const sceneCount = sceneCountSelect ? parseInt(sceneCountSelect.value) || 5 : 5;

        // Get image style (Banana or GPT)
        const imageStyleInput = document.querySelector('input[name="imageStyle"]:checked');
        const imageStyle = imageStyleInput ? imageStyleInput.value : 'banana';

        // Get narrative tone (Comedy, Serious, Dramatic, Mixed)
        const narrativeToneInput = document.querySelector('input[name="narrativeTone"]:checked');
        const narrativeTone = narrativeToneInput ? narrativeToneInput.value : 'mixed';

        // Get no dialog text option
        const noDialogText = noDialogTextCheckbox ? noDialogTextCheckbox.checked : true;

        console.log('Narrative Tone:', narrativeTone);

        // Generate prompts based on current tab (video or image)
        const prompts = [];
        for (let i = 0; i < sceneCount; i++) {
            let prompt;
            if (currentTab === 'image') {
                prompt = generateImagePrompt(i, sceneCount, {
                    character, costume, location, dialogue,
                    videoTitle, secondary, speechText, timeOfDay,
                    imageStyle, noDialogText, narrativeTone
                });
            } else {
                prompt = generateVideoPrompt(i, sceneCount, {
                    character, costume, location, dialogue,
                    videoTitle, secondary, speechText, timeOfDay,
                    imageStyle, noDialogText, narrativeTone
                });
            }
            prompts.push(prompt);
        }

        // Display prompts
        displayPrompts(prompts, currentTab);
    }

    // ===== ENHANCED Scene Emotions & Actions by Type AND Tone =====
    const sceneEmotionsByTone = {
        'comedy': {
            'Opening Shot': {
                emotions: ['comically confused', 'overly enthusiastic', 'hilariously oblivious', 'exaggerated wonder'],
                actions: ['tripping slightly while walking', 'doing exaggerated double-take', 'waving awkwardly', 'striking ridiculous pose'],
                expressions: ['wide-eyed surprise', 'goofy grin', 'raised eyebrow skepticism', 'exaggerated wink'],
                cameraAngles: ['quick snap zoom to face', 'comedic low angle', 'whip pan entrance']
            },
            'Build-up': {
                emotions: ['growing mischief', 'barely contained laughter', 'sarcastic amusement', 'playful scheming'],
                actions: ['sneaky tiptoeing', 'exaggerated whispering', 'comedic stumbling', 'silly dance moves'],
                expressions: ['suppressed giggle', 'mischievous smirk', 'cartoonish surprise', 'eye roll'],
                cameraAngles: ['handheld chaos following action', 'comedic zoom-in on reaction', 'dutch angle for absurdity']
            },
            'Development': {
                emotions: ['peak hilarity', 'infectious joy', 'absurd realization', 'comedic frustration'],
                actions: ['slapstick movement', 'exaggerated reactions', 'comedic running', 'funny falling'],
                expressions: ['belly laugh', 'shocked jaw drop', 'comedic crying', 'over-the-top excitement'],
                cameraAngles: ['freeze frame on peak comedy', 'rapid whip pans', 'exaggerated dolly zoom']
            },
            'Climax': {
                emotions: ['maximum comedic chaos', 'uncontrollable laughter', 'hilariously triumphant', 'comedic relief'],
                actions: ['epic comedic fail', 'triumphant silly pose', 'group laughing fit', 'absurd victory dance'],
                expressions: ['tears of laughter', 'proud but ridiculous face', 'exhausted from laughing', 'comedic satisfaction'],
                cameraAngles: ['dramatic slow-mo of funny moment', 'hero shot with comedic twist', 'chaotic multi-cut']
            },
            'Closing Shot': {
                emotions: ['satisfied silliness', 'warm humor', 'comedic contentment', 'laughing at self'],
                actions: ['walking into sunset but trips', 'waving goodbye then walks into wall', 'final punchline delivery', 'breaking fourth wall wink'],
                expressions: ['knowing smirk', 'satisfied grin', 'shrug with smile', 'peace sign with goofy face'],
                cameraAngles: ['classic sitcom pull-back', 'comedic freeze-frame ending', 'whip pan to title card']
            }
        },
        'serious': {
            'Opening Shot': {
                emotions: ['contemplative silence', 'burdened by thoughts', 'quiet determination', 'hidden pain'],
                actions: ['staring into distance', 'slow deliberate movement', 'touching significant object', 'taking measured breath'],
                expressions: ['distant gaze', 'subtle frown', 'stoic composure', 'eyes holding unshed tears'],
                cameraAngles: ['slow push-in building tension', 'static shot with weight', 'silhouette establishing shot']
            },
            'Build-up': {
                emotions: ['growing unease', 'internal conflict', 'quiet desperation', 'reluctant acceptance'],
                actions: ['pacing slowly', 'clutching hands together', 'avoiding eye contact', 'hesitant reaching out'],
                expressions: ['furrowed brow', 'pressed lips', 'conflicted eyes', 'subtle trembling'],
                cameraAngles: ['intimate close-up', 'over-shoulder revealing', 'dolly around subject']
            },
            'Development': {
                emotions: ['emotional revelation', 'painful truth', 'deep vulnerability', 'raw honesty'],
                actions: ['breaking composure', 'reaching out tentatively', 'letting guard down', 'confronting truth'],
                expressions: ['tears forming', 'voice cracking', 'genuine pain', 'brave vulnerability'],
                cameraAngles: ['extreme close-up on eyes', 'slow zoom emphasizing emotion', 'intimate two-shot']
            },
            'Climax': {
                emotions: ['emotional breaking point', 'profound realization', 'cathartic release', 'painful acceptance'],
                actions: ['emotional embrace', 'silent understanding', 'letting go', 'making difficult choice'],
                expressions: ['tears streaming', 'bittersweet smile', 'peaceful acceptance', 'resolved determination'],
                cameraAngles: ['held close-up allowing emotion', 'slow pull-back revealing isolation', 'match cut to meaning']
            },
            'Closing Shot': {
                emotions: ['quiet resolution', 'hopeful melancholy', 'peaceful acceptance', 'contemplative hope'],
                actions: ['walking forward with purpose', 'looking at horizon', 'releasing burden', 'small genuine smile'],
                expressions: ['serene acceptance', 'hopeful eyes', 'gentle smile through pain', 'quiet strength'],
                cameraAngles: ['slow crane revealing journey ahead', 'fade with atmospheric beauty', 'contemplative wide shot']
            }
        },
        'dramatic': {
            'Opening Shot': {
                emotions: ['underlying tension', 'calm before storm', 'ominous anticipation', 'simmering intensity'],
                actions: ['dramatic entrance', 'powerful stance', 'scanning environment intently', 'clenching fists'],
                expressions: ['steely gaze', 'determined jaw', 'fire in eyes', 'controlled intensity'],
                cameraAngles: ['epic wide shot', 'dramatic low angle', 'slow motion entrance']
            },
            'Build-up': {
                emotions: ['escalating tension', 'mounting pressure', 'fierce determination', 'passionate conviction'],
                actions: ['confrontational approach', 'dramatic gesturing', 'powerful striding', 'intense focus'],
                expressions: ['intense stare', 'passionate plea', 'desperate appeal', 'burning determination'],
                cameraAngles: ['dynamic tracking shot', 'tension-building push-in', 'dramatic arc shot']
            },
            'Development': {
                emotions: ['explosive emotion', 'overwhelming passion', 'desperate love', 'fierce protection'],
                actions: ['dramatic confrontation', 'passionate declaration', 'protective stance', 'emotional breakdown'],
                expressions: ['raw emotion pouring out', 'screaming in frustration', 'crying in anger', 'laughing through tears'],
                cameraAngles: ['intense close-up', 'sweeping emotional crane', 'dramatic Hitchcock zoom']
            },
            'Climax': {
                emotions: ['peak intensity', 'ultimate sacrifice', 'transformative moment', 'epic triumph or tragedy'],
                actions: ['climactic embrace', 'final stand', 'ultimate confession', 'heroic action'],
                expressions: ['all emotion on display', 'triumphant roar', 'heartbroken collapse', 'transcendent peace'],
                cameraAngles: ['epic slow motion', 'dramatic 360 spin', 'powerful crane up', 'explosive visual moment']
            },
            'Closing Shot': {
                emotions: ['earned triumph', 'bittersweet victory', 'profound change', 'epic resolution'],
                actions: ['walking into new dawn', 'embracing loved one', 'standing victorious', 'peaceful final breath'],
                expressions: ['transformed soul', 'battle-worn but triumphant', 'peaceful smile', 'eternal love in eyes'],
                cameraAngles: ['majestic pull-back', 'epic sunset wide', 'fade to powerful imagery', 'cinematic conclusion']
            }
        },
        'mixed': {
            'Opening Shot': {
                emotions: ['lighthearted curiosity', 'playful anticipation', 'genuine warmth', 'subtle excitement'],
                actions: ['casual entrance', 'natural movement', 'friendly gesture', 'relaxed walking'],
                expressions: ['warm smile', 'curious eyes', 'genuine expression', 'natural charm'],
                cameraAngles: ['balanced medium shot', 'natural dolly', 'engaging push-in']
            },
            'Build-up': {
                emotions: ['playful banter', 'growing connection', 'hints of deeper feeling', 'fun moments'],
                actions: ['playful interaction', 'genuine laughter', 'tender moment', 'comedic mishap'],
                expressions: ['infectious laugh', 'surprised delight', 'touched expression', 'amused smirk'],
                cameraAngles: ['dynamic but controlled', 'intimate when needed', 'playful movement']
            },
            'Development': {
                emotions: ['emotional depth emerging', 'vulnerable moment', 'genuine connection', 'touching realization'],
                actions: ['opening up', 'sharing truth', 'supporting each other', 'emotional breakthrough'],
                expressions: ['real tears with humor', 'genuine emotion', 'bittersweet smile', 'touched by kindness'],
                cameraAngles: ['sensitive close-up', 'emotional two-shot', 'meaningful framing']
            },
            'Climax': {
                emotions: ['powerful emotion with levity', 'dramatic but grounded', 'triumphant joy', 'heartfelt resolution'],
                actions: ['emotional embrace', 'triumphant moment', 'tears of joy', 'celebratory action'],
                expressions: ['laughing while crying', 'pure joy', 'overwhelming gratitude', 'complete happiness'],
                cameraAngles: ['dynamic emotional shot', 'joyful movement', 'celebratory framing']
            },
            'Closing Shot': {
                emotions: ['warm satisfaction', 'hopeful future', 'content happiness', 'perfect ending'],
                actions: ['walking together', 'looking at future', 'final laugh together', 'peaceful moment'],
                expressions: ['genuine contentment', 'warm love', 'grateful smile', 'peaceful joy'],
                cameraAngles: ['beautiful pull-back', 'warm sunset shot', 'hopeful wide', 'perfect closure']
            }
        }
    };

    // Fallback for backwards compatibility
    const sceneEmotions = sceneEmotionsByTone['mixed'];

    // ===== Visual Styles =====
    const visualStyles = [
        'Cinematic 4K quality, photorealistic rendering, film grain texture, anamorphic lens distortion',
        'Ultra HD cinematic look, shallow depth of field, professional color grading, filmic texture',
        'Hollywood-style cinematography, rich contrast, detailed textures, premium production value',
        'High-end commercial quality, crisp details, balanced exposure, cinematic color palette',
        'Professional film production, natural skin tones, atmospheric depth, refined aesthetics'
    ];

    // ===== Image Style Presets =====
    const imageStylePresets = {
        'banana': {
            quality: "4K ultra-realistic cinematic",
            colorGrading: "Hollywood film color science with rich contrast",
            rendering: "photorealistic rendering, film grain texture, anamorphic lens",
            skin: "natural skin texture with subsurface scattering, realistic pores",
            lighting: "volumetric lighting with natural shadows",
            details: "hyper-detailed textures, sharp focus, realistic materials"
        },
        'gpt': {
            quality: "4K artistic stylized",
            colorGrading: "vibrant artistic color palette with creative tones",
            rendering: "digital art style, clean lines, stylized aesthetics",
            skin: "smooth artistic skin rendering, stylized features",
            lighting: "dramatic artistic lighting with creative shadows",
            details: "stylized details, artistic interpretation, clean composition"
        }
    };

    // ===== Image Composition Types =====
    const imageCompositions = [
        'rule of thirds with subject on left intersection',
        'centered composition with symmetrical balance',
        'golden ratio spiral leading to subject',
        'diagonal composition creating dynamic tension',
        'framing composition using environmental elements'
    ];

    // ===== Generate Image Prompt (for static images) =====
    function generateImagePrompt(index, total, data) {
        const { character, costume, location, dialogue, videoTitle, secondary, speechText, timeOfDay, imageStyle, noDialogText } = data;

        const lighting = timeLighting[timeOfDay] || 'natural lighting';
        const stylePreset = imageStylePresets[imageStyle] || imageStylePresets['banana'];
        const composition = imageCompositions[index % imageCompositions.length];

        // Build avoid list for images
        const avoidList = [
            "distorted features",
            "extra limbs",
            "blurry details",
            "duplicate faces",
            "floating hands",
            "watermarks",
            "low resolution",
            "pixelation"
        ];

        if (noDialogText) {
            avoidList.unshift(
                "text overlays",
                "dialog boxes",
                "speech bubbles",
                "subtitles",
                "captions",
                "written text",
                "floating text",
                "any text in image"
            );
        }

        // Build JSON structure for IMAGE generation
        const jsonPrompt = {
            image: {
                number: index + 1,
                total: total,
                type: "static image"
            },
            renderStyle: {
                type: imageStyle === 'gpt' ? 'GPT Artistic' : 'Banana Cinematic',
                rendering: stylePreset.rendering,
                quality: stylePreset.quality
            },
            subject: {
                description: character,
                appearance: costume ? `wearing ${costume}` : null,
                physicalDetails: stylePreset.skin,
                pose: "natural and expressive pose",
                expression: "genuine emotional expression"
            },
            visualStyle: {
                quality: stylePreset.quality,
                colorGrading: stylePreset.colorGrading,
                depthOfField: "professional bokeh with sharp subject focus",
                resolution: "4K ultra high definition",
                details: stylePreset.details
            },
            composition: {
                type: composition,
                framing: "professional portrait framing",
                perspective: "eye-level natural perspective",
                aspectRatio: "16:9 or 4:3"
            },
            environment: {
                setting: location || "contextual background",
                timeOfDay: timeOfDay,
                lighting: `${lighting}, ${stylePreset.lighting}`,
                atmosphere: "natural ambient with environmental depth"
            },
            context: videoTitle ? {
                narrative: videoTitle,
                mood: "matching visual mood"
            } : null,
            additionalSubjects: secondary ? {
                description: secondary,
                uniqueAppearance: true,
                positioning: "natural placement in scene"
            } : null,
            interaction: dialogue ? {
                type: dialogue,
                connectionStyle: "genuine and natural"
            } : null,
            noTextInImage: noDialogText,
            // STRICT CONSISTENCY RULES
            consistency: {
                maintainIdentity: true,
                preserveAppearance: true,
                singleCharacterReference: true,
                uniqueFeatures: true,
                // Character consistency
                characterRules: {
                    sameface: "maintain exact same facial features across all images",
                    samebody: "consistent body type and proportions",
                    sameClothing: costume ? `always wearing exactly: ${costume}` : "consistent clothing style",
                    sameHair: "identical hairstyle, color, and length",
                    sameAge: "consistent apparent age throughout"
                },
                // Visual consistency
                visualRules: {
                    colorPalette: "maintain consistent color palette across series",
                    lightingStyle: "consistent lighting direction and quality",
                    artStyle: `consistent ${imageStyle === 'gpt' ? 'artistic stylized' : 'photorealistic cinematic'} rendering`
                }
            },
            // TITLE/THEME CONSISTENCY - Must match the given title
            titleConsistency: videoTitle ? {
                strictAdherence: true,
                title: videoTitle,
                requirement: `ALL scenes MUST directly relate to and visualize: "${videoTitle}"`,
                maintainTheme: "every image must clearly represent the title theme",
                noDeviation: "do not add unrelated elements or change the story context",
                visualConnection: "visual elements must support and enhance the title narrative"
            } : null,
            // STRICT INSTRUCTIONS
            strictInstructions: [
                "CRITICAL: Generate EXACTLY what is described, no creative interpretation",
                "MAINTAIN identical character appearance in every single image",
                "FOLLOW the title/theme precisely without deviation",
                "PRESERVE costume, hairstyle, and physical features consistently",
                "DO NOT change character's identity or appearance between scenes",
                "EACH image must logically connect to the title and story context"
            ],
            avoid: avoidList
        };

        // Clean JSON
        const cleanJSON = JSON.parse(JSON.stringify(jsonPrompt, (key, value) => {
            if (value === null || value === undefined) return undefined;
            return value;
        }));

        const jsonString = JSON.stringify(cleanJSON, null, 2);

        // Simple prompt for images - with strict consistency
        const styleLabel = imageStyle === 'gpt' ? 'GPT artistic style' : 'Banana cinematic style';
        let simplePrompt = `[IMAGE - ${styleLabel}] ${character}`;
        if (costume) simplePrompt += `, ALWAYS wearing ${costume}`;
        if (location) simplePrompt += `, ${location}`;
        simplePrompt += `. ${composition}, ${lighting}`;
        if (dialogue) simplePrompt += `, ${dialogue}`;
        if (videoTitle) simplePrompt += `. STRICT THEME: "${videoTitle}" - all images MUST match this title exactly`;
        if (noDialogText) simplePrompt += '. NO TEXT IN IMAGE.';
        simplePrompt += '. CONSISTENCY: Maintain EXACT same character face, body, hair, clothing in every image. Generate EXACTLY what title describes. No creative deviation. High resolution, professional quality.';

        return {
            sceneNumber: index + 1,
            sceneType: 'Image ' + (index + 1),
            promptType: 'image',
            imageStyle: imageStyle,
            jsonPrompt: cleanJSON,
            jsonString: jsonString,
            simplePrompt: simplePrompt,
            fullPrompt: jsonString
        };
    }

    // ===== Generate Video Prompt (for video scenes) =====
    function generateVideoPrompt(index, total, data) {
        const { character, costume, location, dialogue, videoTitle, secondary, speechText, timeOfDay, imageStyle, noDialogText, narrativeTone = 'mixed' } = data;

        // Determine scene type
        let sceneType;
        if (index === 0) sceneType = 'opening';
        else if (index === total - 1) sceneType = 'closing';
        else if (index < total * 0.3) sceneType = 'buildup';
        else if (index < total * 0.7) sceneType = 'development';
        else sceneType = 'climax';

        // Get scene-specific elements
        const sceneTypeKey = index === 0 ? 'Opening Shot' :
            index === total - 1 ? 'Closing Shot' :
                index < total * 0.3 ? 'Build-up' :
                    index < total * 0.7 ? 'Development' : 'Climax';

        // Get tone-specific scene data
        const toneData = sceneEmotionsByTone[narrativeTone] || sceneEmotionsByTone['mixed'];
        const sceneData = toneData[sceneTypeKey];

        // Get narrative tone info
        const toneInfo = narrativeTones[narrativeTone] || narrativeTones['mixed'];

        // Get tone-specific cameras
        const toneCameras = camerasByTone[narrativeTone] || camerasByTone['mixed'];

        // Get story arc phase
        const storyArc = storyArcs[narrativeTone] || storyArcs['mixed'];
        const arcPhase = storyArc[Math.min(index, storyArc.length - 1)];

        // Get emotion, action, expression, camera based on tone
        const emotion = sceneData.emotions[index % sceneData.emotions.length];
        const action = sceneData.actions[index % sceneData.actions.length];
        const expression = sceneData.expressions ? sceneData.expressions[index % sceneData.expressions.length] : 'natural expression';
        const cameraAngle = sceneData.cameraAngles[index % sceneData.cameraAngles.length];
        const cameraMovement = toneCameras[index % toneCameras.length];
        const transition = toneInfo.transitions[index % toneInfo.transitions.length];

        const lighting = timeLighting[timeOfDay] || 'natural lighting';

        // Get style preset based on selection
        const stylePreset = imageStylePresets[imageStyle] || imageStylePresets['banana'];

        // Build avoid list - always include text/dialog related items when noDialogText is true
        const avoidList = [
            "distorted features",
            "extra limbs",
            "blurry details",
            "static poses",
            "duplicate faces",
            "floating hands",
            "watermarks"
        ];

        // Add text-related items to avoid if noDialogText is enabled
        if (noDialogText) {
            avoidList.unshift(
                "text overlays",
                "dialog boxes",
                "speech bubbles",
                "subtitles",
                "captions",
                "written text",
                "floating text",
                "any text in image"
            );
        }

        // Add audio quality items to avoid - always include for clear audio
        avoidList.push(
            "audio noise",
            "static sounds",
            "muffled dialogue",
            "unclear speech",
            "audio distortion",
            "echo artifacts",
            "background hiss",
            "clipping audio",
            "unbalanced audio levels",
            "overpowering background music"
        );

        // Build JSON structure safe for Google Flow Veo 3 VIDEO
        const jsonPrompt = {
            video: {
                number: index + 1,
                total: total,
                type: sceneType,
                sceneType: sceneTypeKey
            },
            narrativeTone: {
                type: toneInfo.name,
                icon: toneInfo.icon,
                pacing: toneInfo.pacing,
                elements: toneInfo.elements.slice(0, 3)
            },
            storyArc: {
                phase: arcPhase.phase,
                mood: arcPhase.mood,
                twist: arcPhase.twist
            },
            renderStyle: {
                type: imageStyle === 'gpt' ? 'GPT Artistic' : 'Banana Cinematic',
                rendering: stylePreset.rendering,
                quality: stylePreset.quality
            },
            subject: {
                description: character,
                appearance: costume ? `wearing ${costume}` : null,
                physicalDetails: stylePreset.skin,
                emotionalState: emotion,
                facialExpression: expression,
                action: action
            },
            visualStyle: {
                quality: stylePreset.quality,
                colorGrading: stylePreset.colorGrading,
                depthOfField: "natural bokeh with sharp subject focus",
                aspectRatio: "16:9",
                frameRate: "24fps smooth motion",
                details: stylePreset.details
            },
            environment: {
                setting: location || "contextual background",
                timeOfDay: timeOfDay,
                lighting: `${lighting}, ${stylePreset.lighting}`,
                atmosphere: "natural ambient lighting with environmental depth"
            },
            camera: {
                shotType: cameraAngle,
                movement: cameraMovement,
                focus: "sharp focus on subject",
                framing: "rule of thirds composition"
            },
            sceneTransition: {
                type: transition,
                timing: toneInfo.pacing
            },
            audio: speechText ? {
                dialogue: speechText,
                lipSync: true,
                voiceTone: narrativeTone === 'comedy' ? "playful and comedic" :
                    narrativeTone === 'serious' ? "measured and thoughtful" :
                        narrativeTone === 'dramatic' ? "intense and emotional" : "natural and expressive",
                timing: "natural speech rhythm",
                voiceQuality: {
                    clarity: "crystal clear voice recording",
                    noiseReduction: "completely noise-free audio",
                    volume: "balanced and audible",
                    articulation: "clear pronunciation without mumbling"
                }
            } : {
                type: "ambient",
                breathing: "visible natural breathing",
                environment: "scene-appropriate sounds"
            },
            audioQuality: {
                overallQuality: "professional studio-quality audio",
                noiseLevel: "zero background noise or static",
                mixing: "properly balanced audio levels",
                backsound: {
                    type: narrativeTone === 'comedy' ? "upbeat lighthearted background music" :
                        narrativeTone === 'serious' ? "subtle emotional ambient score" :
                            narrativeTone === 'dramatic' ? "powerful cinematic orchestral score" : "mood-matching background music",
                    volume: "background music softer than dialogue",
                    quality: "high fidelity without distortion",
                    noInterference: "music does not overpower speech"
                },
                dialogueClarity: {
                    priority: "dialogue always clear and understandable",
                    separation: "voice isolated from background noise",
                    consistency: "consistent voice volume throughout",
                    noEcho: "no reverb or echo artifacts"
                }
            },
            context: videoTitle ? {
                narrative: videoTitle,
                storyRole: sceneType,
                emotionalGoal: arcPhase.mood
            } : null,
            additionalSubjects: secondary ? {
                description: secondary,
                uniqueAppearance: true
            } : null,
            interaction: dialogue ? {
                type: dialogue,
                connectionStyle: narrativeTone === 'comedy' ? "playful and funny" :
                    narrativeTone === 'serious' ? "meaningful and deep" :
                        narrativeTone === 'dramatic' ? "intense and passionate" : "genuine and natural"
            } : null,
            noTextInImage: noDialogText,
            // STRICT CONSISTENCY RULES FOR VIDEO
            consistency: {
                maintainIdentity: true,
                preserveAppearance: true,
                singleCharacterReference: true,
                noCloning: true,
                uniqueFeatures: true,
                // Character consistency across all video scenes
                characterRules: {
                    sameface: "maintain EXACT same facial features in EVERY frame",
                    samebody: "consistent body type and proportions throughout video",
                    sameClothing: costume ? `always wearing exactly: ${costume}` : "consistent clothing in all scenes",
                    sameHair: "identical hairstyle, color, and length - no changes",
                    sameVoice: "consistent voice tone and speaking style",
                    sameAge: "consistent apparent age throughout all scenes"
                },
                // Visual consistency
                visualRules: {
                    colorPalette: "maintain consistent color grading across all scenes",
                    lightingContinuity: "consistent lighting direction between cuts",
                    artStyle: `consistent ${imageStyle === 'gpt' ? 'artistic stylized' : 'photorealistic cinematic'} rendering`,
                    cameraStyle: "consistent camera quality and film look"
                }
            },
            // TITLE/THEME CONSISTENCY - CRITICAL
            titleConsistency: videoTitle ? {
                strictAdherence: true,
                title: videoTitle,
                requirement: `EVERY scene MUST directly visualize and relate to: "${videoTitle}"`,
                maintainTheme: "all scenes must clearly represent the title narrative",
                noDeviation: "absolutely no unrelated elements or story changes",
                visualConnection: "every visual element must support the title story",
                sceneConnection: "each scene logically connects to form cohesive story matching title"
            } : null,
            // STRICT VIDEO INSTRUCTIONS
            strictInstructions: [
                "CRITICAL: Generate EXACTLY what the title describes",
                "MAINTAIN 100% identical character appearance in EVERY scene",
                "FOLLOW the story/title precisely - no creative deviation",
                "PRESERVE costume, hairstyle, face, and body consistently",
                "CHARACTER MUST look like the SAME person in all scenes",
                "EACH scene must logically continue the title's story",
                "NO morphing, aging, or appearance changes between scenes",
                "SAME character identity from scene 1 to final scene"
            ],
            avoid: avoidList
        };

        // Clean JSON - remove null values
        const cleanJSON = JSON.parse(JSON.stringify(jsonPrompt, (key, value) => {
            if (value === null || value === undefined) return undefined;
            return value;
        }));

        // Create formatted JSON string
        const jsonString = JSON.stringify(cleanJSON, null, 2);

        // Create a simple text version for quick copy - with strict consistency
        const styleLabel = imageStyle === 'gpt' ? 'GPT artistic style' : 'Banana cinematic style';
        const toneLabel = toneInfo.name.toUpperCase();
        let simplePrompt = `[VIDEO - ${styleLabel} - ${toneLabel} TONE] ${character}`;
        if (costume) simplePrompt += `, ALWAYS wearing ${costume}`;
        if (location) simplePrompt += `, ${location}`;
        simplePrompt += `. ${cameraAngle} with ${cameraMovement}`;
        simplePrompt += `. Expression: ${expression}, Emotion: ${emotion}, Action: ${action}`;
        simplePrompt += `. Story Arc: ${arcPhase.phase} (${arcPhase.mood})`;
        if (dialogue) simplePrompt += `. Interaction: ${dialogue}`;
        if (speechText) simplePrompt += `. Speaking clearly: "${speechText}"`;
        if (videoTitle) simplePrompt += `. STRICT STORY: "${videoTitle}" - EVERY scene MUST follow this title exactly`;
        if (noDialogText) simplePrompt += '. NO TEXT OR DIALOG IN VIDEO.';
        simplePrompt += `. AUDIO: Crystal clear dialogue without noise, professional studio quality, balanced background music.`;
        simplePrompt += ` CRITICAL CONSISTENCY: Same EXACT character face, body, hair, clothing in ALL scenes. Generate EXACTLY what title describes. NO deviation. ${toneInfo.pacing}.`;

        return {
            sceneNumber: index + 1,
            sceneType: sceneTypeKey,
            promptType: 'video',
            imageStyle: imageStyle,
            narrativeTone: narrativeTone,
            jsonPrompt: cleanJSON,
            jsonString: jsonString,
            simplePrompt: simplePrompt,
            fullPrompt: jsonString
        };
    }

    // ===== Display Prompts (JSON Format) =====
    function displayPrompts(prompts, tabType) {
        if (!promptsContainer || !outputSection) {
            console.error('Output elements not found');
            return;
        }

        promptsContainer.innerHTML = '';

        // Display JSON prompt cards per scene
        prompts.forEach((p) => {
            const card = document.createElement('div');
            card.className = 'prompt-card';

            // Format JSON with syntax highlighting
            const jsonFormatted = p.jsonString
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
                .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
                .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
                .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
                .replace(/\n/g, '<br>')
                .replace(/  /g, '&nbsp;&nbsp;');

            // Get style badge
            const styleBadge = p.imageStyle === 'gpt' ? '🤖 GPT' : '🍌 Banana';

            // Get type badge based on promptType
            const typeBadge = p.promptType === 'image' ? '🖼️ Image' : '🎬 Video';
            const typeLabel = p.promptType === 'image' ? 'Image' : 'Scene';

            // Get tone badge based on narrativeTone
            const toneIcons = { comedy: '😂', serious: '😐', dramatic: '🎭', mixed: '🎬' };
            const toneNames = { comedy: 'Comedy', serious: 'Serious', dramatic: 'Dramatic', mixed: 'Mixed' };
            const toneBadge = toneIcons[p.narrativeTone] || '🎬';
            const toneName = toneNames[p.narrativeTone] || 'Mixed';

            card.innerHTML = `
                <div class="prompt-header">
                    <span class="scene-badge">${typeBadge} ${p.sceneNumber}</span>
                    <span class="scene-type">${p.sceneType}</span>
                    <span class="tone-badge tone-${p.narrativeTone || 'mixed'}">${toneBadge} ${toneName}</span>
                    <span class="style-badge">${styleBadge}</span>
                    <span class="format-badge">JSON</span>
                </div>
                <div class="prompt-content">
                    <pre class="json-display"><code>${jsonFormatted}</code></pre>
                </div>
                <div class="prompt-actions">
                    <button class="copy-btn copy-json" onclick="copyPrompt(this, '${encodeURIComponent(p.jsonString)}')">
                        📋 Copy JSON Prompt
                    </button>
                    <button class="copy-btn copy-simple" onclick="copyPrompt(this, '${encodeURIComponent(p.simplePrompt)}')">
                        ⚡ Copy Simple Version
                    </button>
                </div>
            `;
            promptsContainer.appendChild(card);
        });

        outputSection.style.display = 'block';
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        console.log('JSON Prompts displayed:', prompts.length);
    }

    // ===== Copy Functions =====
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        }).catch(err => {
            console.error('Copy failed:', err);
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    }

    function showToast(message) {
        if (!toast) return;
        const msgEl = document.getElementById('toastMessage');
        if (msgEl) msgEl.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }

    // Make copyPrompt global for inline onclick
    window.copyPrompt = function (btn, encodedPrompt) {
        const text = decodeURIComponent(encodedPrompt);
        copyToClipboard(text);
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '📋 Copy';
            btn.classList.remove('copied');
        }, 2000);
        showToast('Prompt copied!');
    };

    console.log('FlowPrompt ready!');
});
