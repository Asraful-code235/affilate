import { client } from "../../../sanity/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetCity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if the author already exists
    const query = `*[_type == "city" ] {
     ...
    
    }`;
    const city = await client.fetch(query);
    res.status(200).json({ message: "success", city });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
