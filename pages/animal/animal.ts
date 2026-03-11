interface IAnimalData {
    readonly [key: string]: string,
}

interface IAnimalPageData {
    readonly [key: string]: IAnimalData,
}

const ANIMAL_PAGE_DATA: IAnimalPageData = {
    panda: {
        title: "LIVE PANDA CAMS",
        video: "https://www.youtube.com",
        donTitle: "MAKE THE BAMBOO DONATION!",
        donText: "Our process for bamboo donations first starts with a site evaluation. It is important that our team sees where the bamboo is growing, then determining if the bamboo is a species that our animals are currently eating. Thank you for your interest in donating bamboo for our pandas.",
        infoDesc: "Pandas are often seen eating in a relaxed sitting posture, with their hind legs stretched out before them. They may appear sedentary, but they are skilled tree-climbers and efficient swimmers.",
        stats: "<p><strong>Common Name:</strong> Giant Panda</p><p><string>Specific Name:</strong> Ailuropoda melanoleuca</p><p><strong>Type:</strong> Mammal</p><p><strong>Diet:</strong> Herbivore</p>",
        statsInfo: "Giant pandas are very unusual animals that eat almost exclusively bamboo, which is very low in nutrients. Because of this, they have many unique adaptations for their low-energy lifestyle. Giant pandas are solitary. They have a highly developed sense of smell that males use to avoid each other and to find females for mating in the spring. After a five-month pregnancy, females give birth to a cub or two, though they cannot care for both twins. The blind infants weigh only 5 ounces at birth and cannot crawl until they reach three months of age. They are born white, and develop their much loved coloring later. Habitat loss is the primary threat to this species. Its popularity around the world has helped the giant panda become the focus of successful conservation programs.",
        img: "../../assets/images/panda-info.jpg",
    },
    eagle: {
        title: "Bald Eagle cams",
        video: "https://www.youtube.com",
        donTitle: "Keep the Bald Eagle cams Streaming!",
        donText: "Watch as this lifelong pair of eagle parents lay and protect eggs, feed their chicks and teach them to hunt and fly. Sam & Lora have stolen the hearts of thousands of viewers! 100% of the donations from this page will be utilized directly for the streaming and operational costs of this project.",
        infoDesc: "Because of its role as a symbol of the US, but also because of its being a large predator, the bald eagle has many representations in popular culture. Not all of these representations are accurate. In particular, the movie or television bald eagle typically has a bold, powerful cry. The actual eagle has a much softer, chirpy voice, not in keeping with its popular image.",
        stats: "<p><strong>Common Name:</strong> Giant Panda</p><p><string>Specific Name:</strong> Ailuropoda melanoleuca</p><p><strong>Type:</strong> Mammal</p><p><strong>Diet:</strong> Herbivore</p>",
        statsInfo: 'The bald eagle, with its snowy-feathered (not bald) head and white tail, is the proud national bird symbol of the United States—yet the bird was nearly wiped out there. For many decades, bald eagles were hunted for sport and for the "protection" of fishing grounds.  These powerful birds of prey use their talons to fish, but they get many of their meals by scavenging carrion or stealing the kills of other animals. They live near water and favor coasts and lakes where fish are plentiful, though they will also snare and eat small mammals. Bald eagles are believed to mate for life. A pair constructs an enormous stick nest—one of the bird-world\'s biggest—high above the ground and tends to a pair of eggs each year. Immature eagles are dark, and until they are about five years old, they lack the distinctive white markings that make their parents so easy to identify.',
        img: "../../assets/images/panda-info.jpg",

    },
    gorilla: {
        title: "gorillas cams",
        video: "https://www.youtube.com",
        donTitle: "make a difference for the gorillas!",
        donText: "It is our goal to ensure the conservation and restoration of the gorilla population and their habitat in Central Africa. To do this, we need your help! Bring your food charity straight to Glen and his family.",
        infoDesc: "In addition to having distinctive fingerprints like humans do, gorillas also have unique nose prints. Gorillas are the largest of the great apes, but the western lowland gorilla is the smallest of the subspecies.",
        stats: "<p><strong>Common Name:</strong> Giant Panda</p><p><string>Specific Name:</strong> Ailuropoda melanoleuca</p><p><strong>Type:</strong> Mammal</p><p><strong>Diet:</strong> Herbivore</p>",
        statsInfo: "Western lowland gorillas are the smallest of the four subspecies. They live in thick tropical rainforests, where they find plenty of food for their vegetarian diet. They eat roots, shoots, fruit, wild celery, and tree bark and pulp. Gorillas can climb trees, but they’re usually found on the ground in communities—known as troops. Troops are led by one dominant, older adult male, often called a silverback because of the swath of silver hair that adorns his otherwise dark fur. Troops also include several other young males, some females, and their offspring. The leader organizes troop activities, such as eating, nesting in leaves, and moving about the group's home range. Gorillas prefer traveling on all fours, pushing themselves forward with their knuckles and soles of their feet. Female gorillas give birth to one infant after a pregnancy of nearly nine months. These infants ride on their mothers’ backs from the age of four months through the first two or three years of their lives.",    
        img: "../../assets/images/panda-info.jpg",
    },
    lemur: {
        title: "lemurs cams",
        video: "https://www.youtube.com",
        donTitle: "Provide Andy the lemur with fruits!",
        donText: "More than 90% of lemur species are endangered and might face extinction in the nearest future. Watch the ring-tailed lemurs play and climb in this soothing setting and support them by donating for the fruits they adore.",
        infoDesc: "A ring-tailed lemur mob will gather in open areas of the forest to sunbathe. They sit in what some call a \"yoga position\" with their bellies toward the sun and their arms and legs stretched out to the sides.",
        stats: "<p><strong>Common Name:</strong> Giant Panda</p><p><string>Specific Name:</strong> Ailuropoda melanoleuca</p><p><strong>Type:</strong> Mammal</p><p><strong>Diet:</strong> Herbivore</p>",
        statsInfo: "Ring-tailed lemurs are named for the 13 alternating black and white bands that adorn their tails. Unlike most other lemurs, ringtails spend 40 percent of their time on the ground, moving quadrupedally along the forest floor. Ring-tailed lemurs live in southwestern Madagascar, in arid, open areas and forests in territories that range from 15 to 57 acres (0.06 to 0.2 square kilometers) in size. As with all lemurs, olfactory communication is important for ringtails. Ring-tailed lemurs have scent glands on their wrists and chests that they use to mark their foraging routes. Ringtails eat leaves, flowers and insects. They can also eat fruit, herbs and small vertebrates. Females usually give birth to their first baby when they are three years old, and usually once a year every year after that. All adult females participate in raising the offspring of the group. The median life expectancy for a ring-tailed lemur is about 16 years.",
        img: "../../assets/images/panda-info.jpg",
    }
}

const updatePageHeadersAndTitles = (): void => {
// const data = animalData[animal];
    // if (!data) return;

    // // 1. Update text and media
    // document.getElementById('animal-title').textContent = data.title;
    // document.getElementById('video-stream').src = data.video;
    // document.getElementById('donation-title').textContent = data.donTitle;
    // document.getElementById('donation-text').textContent = data.donText;
    // document.getElementById('info-desc').textContent = data.infoDesc;
    // document.getElementById('animal-stats').innerHTML = data.stats;
    // document.getElementById('animal-details-img').src = data.img;

    // // 2. Update active state in sidebar
    // document.querySelectorAll('.animal-cam-btn').forEach(btn => {
    //     btn.classList.remove('active');
    //     if (btn.getAttribute('aria-label').toLowerCase().includes(animal)) {
    //         btn.classList.add('active');
    //     }
    // });
}