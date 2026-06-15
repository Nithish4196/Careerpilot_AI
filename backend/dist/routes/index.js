"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Define your API routes here
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Careerpilot AI API' });
});
exports.default = router;
//# sourceMappingURL=index.js.map