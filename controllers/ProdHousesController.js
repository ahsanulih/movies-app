const { ProductionHouse } = require('../models');

class ProdHousesController {
    static list(req, res) {
        ProductionHouse.findAll({
            order: [['name_prodHouse', 'ASC']]
        })
            .then((prodHouses) => {
                res.render('prodHousesList.ejs', { prodHouses });
            })
            .catch((err) => {
                res.send(err);
            });
    }
}

module.exports = ProdHousesController;
