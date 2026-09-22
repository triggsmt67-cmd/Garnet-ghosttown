// WPGraphQL queries. Field names assume the ACF setup documented in README.md
// ("WordPress setup"), exposed through the official WPGraphQL for ACF plugin.
// If a GraphQL name is changed in ACF, change it here — nowhere else.

const IMAGE_FIELDS = /* GraphQL */ `
  sourceUrl
  altText
  mediaDetails { width height }
`;

export const EVENTS_QUERY = /* GraphQL */ `
  query GarnetEvents {
    events(first: 100, where: { status: PUBLISH }) {
      nodes {
        databaseId
        title
        content
        featuredImage { node { ${IMAGE_FIELDS} } }
        eventDetails {
          eventStart
          eventEnd
          eventHomepageSummary
          eventPrice
          eventPriceNote
          eventDetailsUrl
          eventAccessAdvisory
          eventFeatureOnHomepage
          eventStatus
          eventRegistrationRequired
        }
      }
    }
  }
`;

export const VISITOR_STATUS_QUERY = /* GraphQL */ `
  query GarnetVisitorStatus {
    garnetVisitorStatus {
      roadAndWinterAccess {
        roadStatus
        roadNote
        roadLastVerified
        roadTone
        roadReportUrl
      }
    }
  }
`;

export const STORIES_QUERY = /* GraphQL */ `
  query GarnetStories {
    garnetStories(first: 200, where: { status: PUBLISH }) {
      nodes {
        databaseId
        slug
        title
        content
        storyDetails {
          leadIn
          timeFrame
          startYear
          storyType
          mainPhoto { node { ${IMAGE_FIELDS} } }
          photoCredit
          voiceQuote
          voiceSpeaker
          voiceSource
          mapBuilding
          sourceLabel
          sourceUrl
          relatedStories {
            nodes {
              ... on GarnetStory {
                slug
                title
                storyDetails { timeFrame }
              }
            }
          }
        }
      }
    }
  }
`;
