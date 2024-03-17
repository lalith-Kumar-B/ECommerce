class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? 
            {$or:[
                {name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                }},
                {category: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                }}
            ]}
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        
        let querySt = JSON.stringify(queryCopy);
        querySt = querySt.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        
        this.query = this.query.find(JSON.parse(querySt));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

export default ApiFeatures;