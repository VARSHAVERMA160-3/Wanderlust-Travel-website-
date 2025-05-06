const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const {listingSchema} =require("../schema.js");
const ExpressError=require("../utils/ExpressError.js")
const Listing =require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} =require("../middleware.js")
const multer =require('multer');
const { storage }=require("../cloudconfig.js");
const upload =multer ({storage});



const listingController =require("../controllers/listing.js")


router
.route("/")
//INDEX ROUTE
.get(wrapAsync(listingController.index))
// create route
.post(isLoggedIn,upload.single("listing[image]"),validateListing,
  wrapAsync( listingController.createListing)
);


//NEW ROUTE
router.get("/new",isLoggedIn,listingController.renderNewForm
);

router.
route("/:id")
.get(wrapAsync(listingController.showListing
))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),
  validateListing,wrapAsync(
  listingController.updateListing 
  ))
  .delete(isLoggedIn,isOwner,wrapAsync( 
    listingController.destroyListing
    ));












//EDIT ROUTE
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(
  listingController.renderEditForm
)
);



module.exports= router;