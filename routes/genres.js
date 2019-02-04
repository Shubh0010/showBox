const express = require(`express`);
const router = express.Router();
const mongoose = require(`mongoose`);
const { Movie, validate } = require(`../models/movie`);
const auth = require(`../middleware/auth`)

router.get(`/`, (req, res) => {
    function* generatorFunc() {                                                                         // Used geneartion function to handle database query
        yield new Promise((resolve, reject) => {
            const movies = Movie
                .find()
                .select({ name: 1, genres: 1, release_Date: 1 })
                .then(done => resolve(done))
                .catch(err => console.log(err))
        })

    }
    let generatorFuncObj = generatorFunc();
    generatorFuncObj.next().value
        .then(msg => res.send(msg))
        .catch(err => console.log(err))

})
router.get(`/:id`,async (req, res) => {
    const movies = await Movie
        .findById(req.params.id)
        .select({ name: 1, genres: 1, release_Date: 1 })                                                // Only showing name, genres and date

    if (!movies) return res.status(404).send(`Wrong ID`);
    res.send(movies);
})
router.post('/', auth, async (req, res) => {                                                            // this thing is first authorized
    const check = validate(req.body);
    if (check.error) return res.status(404).send(check.error.details[0].message)

    const movie = new Movie({
        name: req.body.name,
        genres: req.body.genres,
        numberOfCasts: req.body.numberOfCasts,
        isReleased: req.body.isReleased,
        release_Date: req.body.release_Date
    })
    const result = await movie.save();
    res.send(result);
})
router.put('/:id', async (req, res) => {
    const result = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })  // With this new : true key value pair we get the updated document
    if (!result) return res.status(404).send(`Wrong ID`);
    res.send("Updated");
})
router.delete('/:id', auth, async (req, res) => {
    const result = await Movie.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send(`Wrong ID`);
    res.send("Deleted");
})

module.exports = router;