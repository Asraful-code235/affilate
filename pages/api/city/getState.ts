import { client } from "../../../sanity/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetStates(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if the author already exists
    const query = `*[_type == "states" ] {
     ...,
     cities[]->{
        ...,
        cityname
     }
    
    }`;
    const states = await client.fetch(query);
    res.status(200).json({ message: "success", states });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
