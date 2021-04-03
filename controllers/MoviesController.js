const { Movie, ProductionHouse, MovieCast, Cast } = require('../models');

class MoviesController {
    static list(req, res) {
        const { notif } = req.query;
        Movie.findAll({
            order: [['released_year', 'DESC']],
            include: [ProductionHouse]
        })
            .then((movies) => {
                res.render('moviesList.ejs', {
                    movies,
                    notif,
                    ProductionHouse
                });
            })
            .catch((err) => {
                res.send(err);
            });
    }
    static showAddForm(req, res) {
        const { notif } = req.query;
        if (!notif) res.render('movieAddForm.ejs', { notif: null });
        else res.render('movieAddForm.ejs', { notif: notif.split(',') });
    }

    static add(req, res) {
        const { name, released_year, rating, genre } = req.body;

        const validasi = [];
        if (!name) validasi.push(`Name tidak boleh kosong`);
        if (!released_year) validasi.push(`Released year tidak boleh kosong`);
        if (!rating) validasi.push(`Rating tidak boleh kosong`);
        if (!genre) validasi.push(`Genre tidak boleh kosong`);

        if (validasi.length) {
            res.redirect(`/movies/add?notif=${validasi}`);
        } else {
            Movie.create({ name, released_year, rating, genre })
                .then((data) => {
                    res.redirect(
                        `/movies?notif=Berhasil menambahkan movie ${data.name}`
                    );
                })
                .catch((err) => {
                    res.send(err);
                });
        }
    }

    static showEditForm(req, res) {
        const { notif } = req.query;
        let { id } = req.params;
        id = parseInt(id);

        let movie;

        Movie.findByPk(id, { include: [ProductionHouse] })
            .then((foundMovie) => {
                movie = foundMovie;
                return ProductionHouse.findAll({
                    order: [['name_prodHouse', 'ASC']]
                });
            })
            .then((ProductionHouses) => {
                res.render('movieEditForm.ejs', { notif: notif.split(','), movie, ProductionHouses });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static edit(req, res) {
        let { id } = req.params;
        id = parseInt(id);
        let { name, released_year, rating, genre, ProductionHouseId } = req.body;
        rating = parseInt(rating);

        const validasi = [];
        if (!name) validasi.push(`Name tidak boleh kosong`);
        if (!released_year) validasi.push(`Released year tidak boleh kosong`);
        if (!rating) validasi.push(`Rating tidak boleh kosong`);
        if (!genre) validasi.push(`Genre tidak boleh kosong`);
        if (!ProductionHouseId) validasi.push(`Production House tidak boleh kosong`);

        if (validasi.length) {
            res.redirect(`/movies/${id}/edit?notif=${validasi}`);
        } else {
            Movie.update(
                { name, released_year, rating, genre, ProductionHouseId },
                { where: { id: id } }
            )
                .then(([movie]) => {
                    let notif;
                    if (movie === 1) {
                        notif = `Berhasil edit movie`;
                    } else {
                        notif = `Gagal edit movie`;
                    }
                    res.redirect(`/movies?notif=${notif}`);
                })
                .catch((err) => {
                    res.send(err);
                });
        }
    }

    static delete(req, res) {
        let { id } = req.params;
        id = parseInt(id);

        Movie.destroy({ where: { id: id } })
            .then((movie) => {
                let notif;
                if (movie === 1) {
                    notif = `Sukses delete movie`;
                } else {
                    notif = `Gagal delete movie`;
                }
                res.redirect(`/movies?notif=${notif}`);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static showDetail(req, res) {
        let { notif } = req.query;
        let { id } = req.params;
        id = parseInt(id);

        let movie;
        let casts;

        Movie.findByPk(id, { include: [MovieCast] })
            .then((foundMovie) => {
                movie = foundMovie;
                return Cast.findAll({
                    order: [['first_name', 'ASC']]
                });
            })
            .then((allCasts) => {
                casts = allCasts;
                return MovieCast.findAll({
                    where: { MovieId: id }, 
                    include: [Cast] 
                });
            })
            .then((movieCasts) => {
                if (!notif) res.render('movieDetail.ejs', { notif: null, movie, casts, movieCasts });
                else {res.render('movieDetail.ejs', { notif: notif.split(','), movie, casts, movieCasts });}
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static addCast(req, res) {
        let {id} = req.params;
        let { CastId, role } = req.body;
        CastId = parseInt(CastId)
        const MovieId = parseInt(id);

        const validasi = [];
        if (!CastId) validasi.push(`Cast tidak boleh kosong`);
        if (!role) validasi.push(`Role tidak boleh kosong`);

        if (validasi.length) {
            res.redirect(`/movies/${id}/add-cast?notif=${validasi}`);
        } else {
            MovieCast.create({ MovieId, CastId, role })
                .then(() => {
                    res.redirect(
                        `/movies/${id}/add-cast?notif=Berhasil menambahkan cast`
                    );
                })
                .catch((err) => {
                    res.send(err);
                });
        }
    }
}

module.exports = MoviesController;
