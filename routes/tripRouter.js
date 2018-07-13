const express = require('express');
const { tripController } = require('../controllers');

const router = express.Router();

router.get('/trips', tripController.getAllTrips);
router.get('/trips/:tripId', tripController.getTripById);
router.get('/users/:id/trips', tripController.getAllTrips);

router.route('/users/:id/trips/created')
  .get(tripController.getTripsCreatedByUser)
  .post(tripController.createTrip);

router.route('/users/:id/trips/created/:tripId')
  .get(tripController.getOneTripOfUser)
  .put(tripController.updateTripOfUser)
  .delete(tripController.deleteTripOfUser);

router.get('/users/:id/trips/subscribed', tripController.getTripsSubscribedByUser);
router.route('/users/:id/trips/subscribed/:tripId')
  .get(tripController.getOneTripSubscribedByUser)
  .post(tripController.subscribeToTrip)
  .delete(tripController.unsubscribeToTrip);

module.exports = router;
