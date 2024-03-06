const { GraphQLClient } = require("graphql-request");
const { Character } = require("../database/models");

const client = new GraphQLClient("https://rickandmortyapi.com/graphql");

app.get("/characters", async (req, res) => {
  try {
    // Fetch data from Rick And Morty API
    const query = `{
        characters {
          results {
            id
            name
            status
            species
            type
            gender
            origin {
              name
            }
            location {
              name
            }
            image
            episode {
              id
              name
            }
          }
        }
      }`;
    const response = await client.request(query);

    // Store data in local server database
    await Character.bulkCreate(response.characters.results, {
      updateOnDuplicate: [
        "name",
        "status",
        "species",
        "type",
        "gender",
        "origin",
        "location",
        "image",
        "episode",
      ],
    });

    // Send data to frontend
    res.json(response.characters.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
