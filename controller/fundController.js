const fund = require("../models/fund");


//create funds (post request)
exports.createFund = async (req, res) => {
    try {
        const response = await fund.create(req.body);
        res.status(201).json({
            success: true,
            data: response,
            message: "fund created successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}
//get data 
exports.getFund = async (req, res) => {
    try {
        const response = await fund.find();
        res.status(200).json({
            success: true,
            data: response,
            message: "fund fetched successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: "couldn't get fund",
            message: err.message
        })
    }
}
//get by id 
exports.getFundById = async (req, res) => {
    try {
        const id = req.params.id || req.body.id;
        const response = await fund.findById(id);
        if (!response) {
            return res.status(404).json({
                success: false,
                message: "data not found"
            });
        }
        res.status(200).json({
            success: true,
            data: response,
            message: "fund fetched successfully by id"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: "couldn't get fund by id",
            message: err.message
        })
    }
}

//update controller 
exports.updateFund = async (req, res) => {
    try {
        //extract
        // const { id,title, amount, date, status, image } = req.body;
        //import the needy ones
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Fund ID is required for update.",
            });
        }
        const Fundresponse = await fund.findById(id);
        if (!Fundresponse) {
            return res.status(404).json({
                success: false,
                message: "Fund not found"
            });
        }
        // Update amount and status if sent
        const { amount, status, date } = req.body;
        if (amount) Fundresponse.amount = amount;
        if (status) Fundresponse.status = status;
        if (status) {
            if (status === "used") Fundresponse.date = date || "";
            else Fundresponse.date = undefined;
        }


        // Handle image upload
        if (req.files && req.files.length > 0) {
            //from cloudnary
            const imageUrls = req.files.map(file => file.path);
            Fundresponse.image.push(...imageUrls);
        }
        await Fundresponse.save();
        res.status(200).json({
            success: true,
            updatedFund: Fundresponse,
            message: "Fund updated successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: "couldn't update fund",
            message: err.message
        })
    }
}