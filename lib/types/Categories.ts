export interface ICategories {
  name: string,
  categoryCode: number,
  image?: string,
  icon?: string,
  header: string,
  subCategories: ISubCategory[]
}

export interface ISubCategory {
  name: string,
  categoryCode: number
}

export const CATEGORIES: ICategories[] = [
  {
    name: "Design",
    categoryCode: 1,
    image: "https://www.ninjadesignstudio.com/wp-content/uploads/2021/09/female-digital-artist-banner.jpg",
    icon: "/design.svg",
	  header: "The best Graphic Design for you",
    subCategories: [
      {
        name: "All",
        categoryCode: 1
      },
      {
        name: "Website Design",
        categoryCode: 2
      },
      {
        name: "Logo Design",
        categoryCode: 3
      },
      {
        name: "Spotify Canvas",
        categoryCode: 4
      },
      {
        name: "Artworks",
        categoryCode: 5
      },
      {
        name: "Visuals",
        categoryCode: 6
      },
      {
        name: "T-Shirts & Merchandise",
        categoryCode: 7
      },
      {
        name: "NFT-Art",
        categoryCode: 8
      },
      {
        name: "Social-Media-Design",
        categoryCode: 9
      },
      {
        name: "Flyer-Design",
        categoryCode: 10
      },
      {
        name: "Other",
        categoryCode: 11
      }
    ]
  },
  {
    name: "Digital Marketing",
    categoryCode: 2,
    image: "https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	  header: "The best Marketing for you",
    icon: "/marketing.svg",
    subCategories: [
      {
        name: "All",
        categoryCode: 1
      },
      {
        name: "Magazine Features",
        categoryCode: 2
      },
      {
        name: "Social-Media Ads",
        categoryCode: 3
      },
      {
        name: "Youtube-Ads",
        categoryCode: 4
      },
      {
        name: "Spotify Playlists",
        categoryCode: 5
      },
      {
        name: "Radio-Promo",
        categoryCode: 6
      },
      {
        name: "Other",
        categoryCode: 7
      }
    ]
  },
  {
    name: "Mentoring",
    categoryCode: 3,
    image: "https://cdn.shopify.com/s/files/1/0246/2259/6168/files/artist-header-lady-skollie_2048x1250.jpg?v=4418695401200863796",
	  header: "The best Mentoring for you",
    icon: "/mentoring.svg",
    subCategories: [
      {
        name: "Labels",
        categoryCode: 2
      },
      {
        name: "Artists",
        categoryCode: 3
      },
      {
        name: "Other",
        categoryCode: 4
      }
    ]
  },
  {
    name: "Influencer Marketing",
    categoryCode: 4,
    image: "https://b2h3x3f6.stackpathcdn.com/assets/landing/img/main-bg.jpg",
	  header: "The best Social Media for you",
    icon: "/influencer.svg",
    subCategories: [
      {
        name: "All",
        categoryCode: 1
      },
      {
        name: "Tiktok",
        categoryCode: 2
      },
      {
        name: "Instagram",
        categoryCode: 3
      },
      {
        name: "Youtube",
        categoryCode: 4
      },
      {
        name: "Snapchat",
        categoryCode: 5
      },
      {
        name: "Facebook",
        categoryCode: 6
      },
      {
        name: "Other",
        categoryCode: 7
      },
    ]
  }
];
