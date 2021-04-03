const { Movie, ProductionHouse, Cast, MovieCast } = require('../models');

class CastsController {
    static list(req, res) {
        const { notif } = req.query;
        Cast.findAll({
            order: [['first_name', 'ASC']]
        })
            .then((casts) => {
                res.render('castsList.ejs', { casts, notif });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static showAddForm(req, res) {
        const { notif } = req.query;
        if (!notif) res.render('castAddForm.ejs', { notif: null });
        else res.render('castAddForm.ejs', { notif: notif.split(',') });
    }

    static add(req, res) {
        const {first_name, last_name, birth_year, phone_number, gender} = req.body;

        const validasi = [];
        if (!first_name) validasi.push(`First name tidak boleh kosong`);
        if (!birth_year) validasi.push(`Birth year tidak boleh kosong`);
        if (!phone_number) validasi.push(`Phone number tidak boleh kosong`);
        if (!gender) validasi.push(`Gender tidak boleh kosong`);

        if (validasi.length) {
            res.redirect(`/casts/add?notif=${validasi}`);
        } else {
            Cast.create({first_name, last_name, birth_year, phone_number, gender})
                .then((data) => {
                    res.redirect(`/casts?notif=Berhasil menambahkan cast ${data.first_name} ${data.last_name}`);
                })
                .catch((err) => {
                    res.send(err);
                });
        }
    }

    static showEditForm(req, res) {
        let { id } = req.params;
        id = parseInt(id);

        Cast.findByPk(id)
            .then((cast) => {
                res.render('castEditForm.ejs', { cast });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static edit(req, res) {
        let { id } = req.params;
        id = parseInt(id);
        const {first_name, last_name, birth_year, phone_number, gender} = req.body;

        Cast.update(
            { first_name, last_name, birth_year, phone_number, gender },
            { where: { id: id } }
        )
            .then(([cast]) => {
                let notif;
                if (cast === 1) {
                    notif = `Berhasil edit cast`;
                } else {
                    cast = `Gagal edit cast`;
                }
                res.redirect(`/casts?notif=${notif}`);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static delete(req, res) {
        let { id } = req.params;
        id = parseInt(id);

        Cast.destroy({ where: { id: id } })
            .then((cast) => {
                let notif;
                if (cast === 1) {
                    notif = `Sukses delete cast`;
                } else {
                    notif = `Gagal delete cast`;
                }
                res.redirect(`/casts?notif=${notif}`);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static showDetail(req, res) {
        let { id } = req.params;
        id = parseInt(id);

        let cast;

        Cast.findByPk(id, { include: [MovieCast]})
            .then((foundCast) => {
                cast = foundCast;
                return MovieCast.findAll({
                    where: { CastId: id }, 
                    include: [Movie, Cast] 
                });
            })
            .then((movieCast) => {
                res.render('castDetail.ejs', { cast, movieCast });
            })
            .catch((err) => {
                res.send(err);
            });
    }
}

module.exports = CastsController;
