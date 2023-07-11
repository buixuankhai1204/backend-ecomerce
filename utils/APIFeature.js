module.exports = class APIFeature {
    constructor(document, queryString) {
        this.doc = document;
        this.query = null;
        this.queryString = queryString;

    }

    filter() {
        const queryObj = {...this.queryString};
        const excludeParam = ['page', 'sort', 'limit', 'fields'];
        excludeParam.forEach(el => {delete queryObj[el]})

        let queryParam = JSON.stringify(queryObj);
        queryParam = queryParam.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.doc.find(JSON.parse(queryParam));
        return this;
    }

    sort() {
        if(this.queryString.sort) {
           const sortBy =  this.queryString.sort.replace(',',' ');
            console.log(sortBy);
           this.query = this.query.sort(sortBy).allowDiskUse(true);
        }
        else {
            this.query = this.query.sort('name');
        }

        return this;

    }

    paginate() {
            const page = this.query.page *1 || 1;
            const limit = this.queryString.limit * 1 || 100;
            const skip = (page-1) * limit;
            this.query = this.query.skip(skip).limit(limit);
        return this;
    }

}