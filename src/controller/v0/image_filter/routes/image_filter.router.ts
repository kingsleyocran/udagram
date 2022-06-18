import { Router, Request, Response } from "express";
import { filterImageFromURL, deleteLocalFiles } from "../../../../util/util";

const router: Router = Router();


router.get("/", async (req: Request, res: Response) => {
  let { image_url } = req.query;

  //Validate the image_url query
  if (!image_url) {
    res.status(400).send("Error : Empty image url submitted");
  }

  try {

    //Call filterImageFromURL(image_url) to filter the image
    const filteredImage: string = await filterImageFromURL(image_url.toString());

    //Send the resulting file in the response
    res.status(200).sendFile(filteredImage);

    //Deletes any files on the server on finish of the response
    res.on("finish", () => deleteLocalFiles([filteredImage]));

  } catch (err) {
    console.log(err);
    if (err === "Reading"){
        res
      .status(415)
      .send("Error : Unsupported file");
    }else if(err === "Filtering"){
        res
      .status(422)
      .send("Error : The image can not be filtered");
    }
  }
});

export const ImageFilterRouter: Router = router;
