import {mergeRatings, Rating, RatingsToItemIdMap} from "./ratings";

const ratingMovie1User1: Rating = {
    "answers":[
        {
            "questionId":"5a44721a8f8d20aa9c3cac59",
            "answer":2
        },
        {
            "questionId":"5a4472348f8d20aa9c3cac60",
            "answer":0
        },
        {
            "questionId":"5a4472478f8d20aa9c3cac66",
            "answer":1
        },
        {
            "questionId":"5a4472578f8d20aa9c3cac6c",
            "answer":2
        },
        {
            "questionId":"5a4472698f8d20aa9c3cac71",
            "answer":0
        }
    ],
    "review":"",
    "subjectId":"m284054",
    "userId":"5a447281b864ed0010fd99b7",
    "userName":"Test",
    "usersRating":"A"
};

const ratingMovie1User1WithReview: Rating = {
    "answers": [],
    "review": "test review",
    "subjectId": "m284054",
    "userId": "5a447281b864ed0010fd99b7",
    "userName": "",
};

const ratingMovie1User1WithoutReview: Rating = {
    "answers": [],
    "review": "",
    "subjectId": "m284054",
    "userId": "5a447281b864ed0010fd99b7",
    "userName": "",
    "usersRating":"A"
};

const ratingMovie1User1WithReviewAndWithUserRating: Rating = {
    "answers":[],
    "review":"test review",
    "subjectId":"m284054",
    "userId":"5a447281b864ed0010fd99b7",
    "userName":"",
    "usersRating":"A"
};

const ratingMovie2User1: Rating = {
    "answers":[
        {
            "questionId":"5a44721a8f8d20aa9c3cac59",
            "answer":2
        },
        {
            "questionId":"5a4472348f8d20aa9c3cac60",
            "answer":0
        },
        {
            "questionId":"5a4472478f8d20aa9c3cac66",
            "answer":1
        },
        {
            "questionId":"5a4472578f8d20aa9c3cac6c",
            "answer":2
        },
        {
            "questionId":"5a4472698f8d20aa9c3cac71",
            "answer":0
        }
    ],
    "review":"",
    "subjectId":"m284055",
    "userId":"5a447281b864ed0010fd99b7",
    "userName":"Test",
    "usersRating":"A"
};

const ratingMovie1User2: Rating = {
    "answers":[
        {
            "questionId":"5a44721a8f8d20aa9c3cac59",
            "answer":2
        },
        {
            "questionId":"5a4472348f8d20aa9c3cac60",
            "answer":0
        },
        {
            "questionId":"5a4472478f8d20aa9c3cac66",
            "answer":1
        },
        {
            "questionId":"5a4472578f8d20aa9c3cac6c",
            "answer":2
        },
        {
            "questionId":"5a4472698f8d20aa9c3cac71",
            "answer":0
        }
    ],
    "review":"test 1",
    "subjectId":"m284054",
    "userId":"5a447281b864ed0010fd99b8",
    "userName":"Test",
    "usersRating":"A"
};

const ratingMovie2User2: Rating = {
    "answers":[
        {
            "questionId":"5a44721a8f8d20aa9c3cac59",
            "answer":2
        },
        {
            "questionId":"5a4472348f8d20aa9c3cac60",
            "answer":0
        },
        {
            "questionId":"5a4472478f8d20aa9c3cac66",
            "answer":1
        },
        {
            "questionId":"5a4472578f8d20aa9c3cac6c",
            "answer":2
        },
        {
            "questionId":"5a4472698f8d20aa9c3cac71",
            "answer":0
        }
    ],
    "review":"",
    "subjectId":"m284055",
    "userId":"5a447281b864ed0010fd99b8",
    "userName":"Test",
    "usersRating":"A"
};

const ratingMovie2User3: Rating = {
    "answers":[
        {
            "questionId":"5a44721a8f8d20aa9c3cac59",
            "answer":2
        },
        {
            "questionId":"5a4472348f8d20aa9c3cac60",
            "answer":0
        },
        {
            "questionId":"5a4472478f8d20aa9c3cac66",
            "answer":1
        },
        {
            "questionId":"5a4472578f8d20aa9c3cac6c",
            "answer":2
        },
        {
            "questionId":"5a4472698f8d20aa9c3cac71",
            "answer":0
        }
    ],
    "review":"test 3",
    "subjectId":"m284055",
    "userId":"5a447281b864ed0010fd99b9",
    "userName":"Test",
    "usersRating":"A"
};

test('Merging empty ratings array with empty ratings map', () => {
    const oldRatings: RatingsToItemIdMap = {};
    const newRatings: Rating[] = [];

    expect(mergeRatings(oldRatings, newRatings)).toEqual({});
});

test('Merging ratings array with one item with empty ratings map', () => {
    const oldRatings: RatingsToItemIdMap = {};
    const newRatings: Rating[] = [ratingMovie1User1];

    expect(mergeRatings(oldRatings, newRatings)).toEqual({
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: ratingMovie1User1
        }
    });
});

test('Merging ratings array with one item with ratings map with one item', () => {
    const oldRatings: RatingsToItemIdMap = {
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: ratingMovie1User1
        }
    };
    const newRatings: Rating[] = [ratingMovie1User2];

    expect(mergeRatings(oldRatings, newRatings)).toEqual({
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: ratingMovie1User1,
            [ratingMovie1User2.userId]: ratingMovie1User2
        }
    });
});

test('Merging ratings array with one review item together with map with one item without review', () => {
    const oldRatings: RatingsToItemIdMap = {
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: ratingMovie1User1
        }
    };
    const newRatings: Rating[] = [ratingMovie1User1WithReview];

    expect(mergeRatings(oldRatings, newRatings)).toEqual({
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: {...ratingMovie1User1, review: ratingMovie1User1WithReview.review}
        }
    });
});

test('Merging rating object with empty review with object with existing review', () => {
    const oldRatings: RatingsToItemIdMap = {
        [ratingMovie1User1WithReview.subjectId]: {
            [ratingMovie1User1WithReview.userId]: ratingMovie1User1WithReview
        }
    };

    const newRatings: Rating[] = [ratingMovie1User1WithoutReview];

    const expectedResult = {
        [ratingMovie1User1WithReview.subjectId]: {
            [ratingMovie1User1WithReview.userId]: ratingMovie1User1WithReviewAndWithUserRating
        }
    };

    expect(mergeRatings(oldRatings, newRatings)).toEqual(expectedResult);
});

test('Merging ratings array with userRating item together with map with review', () => {
    const oldRatings: RatingsToItemIdMap = {
        [ratingMovie1User1WithReview.subjectId]: {
            [ratingMovie1User1WithReview.userId]: ratingMovie1User1WithReview
        }
    };

    const newRatings: Rating[] = [ratingMovie1User1WithReviewAndWithUserRating];

    const expectedResult = {
        [ratingMovie1User1WithReview.subjectId]: {
            [ratingMovie1User1WithReview.userId]: ratingMovie1User1WithReviewAndWithUserRating
        }
    };

    expect(mergeRatings(oldRatings, newRatings)).toEqual(expectedResult);
});

test('Merging ratings array with two items with map with one item', () => {
    const oldRatings: RatingsToItemIdMap = {
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: ratingMovie1User1
        }
    };
    const newRatings: Rating[] = [ratingMovie1User1WithReview, ratingMovie1User2];

    expect(mergeRatings(oldRatings, newRatings)).toEqual({
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: {...ratingMovie1User1, review: ratingMovie1User1WithReview.review},
            [ratingMovie1User2.userId]: ratingMovie1User2
        }
    });
});

test('Merging array with 4 items with map with 2 items', () => {
    const oldRatings: RatingsToItemIdMap = {
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: ratingMovie1User1,
            [ratingMovie1User2.userId]: ratingMovie1User2
        }
    };

    const newRatings: Rating[] = [ratingMovie2User3, ratingMovie1User1WithReview, ratingMovie2User1, ratingMovie2User2];

    expect(mergeRatings(oldRatings, newRatings)).toEqual({
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: {...ratingMovie1User1, review: ratingMovie1User1WithReview.review},
            [ratingMovie1User2.userId]: ratingMovie1User2
        },
        [ratingMovie2User1.subjectId]: {
            [ratingMovie2User1.userId]: ratingMovie2User1,
            [ratingMovie2User2.userId]: ratingMovie2User2,
            [ratingMovie2User3.userId]: ratingMovie2User3
        }
    });
});

test('Merging empty array with map with 2 items', () => {
    const oldRatings: RatingsToItemIdMap = {
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: ratingMovie1User1,
            [ratingMovie1User2.userId]: ratingMovie1User2
        }
    };

    const newRatings: Rating[] = [];

    expect(mergeRatings(oldRatings, newRatings)).toEqual({
        [ratingMovie1User1.subjectId]: {
            [ratingMovie1User1.userId]: ratingMovie1User1,
            [ratingMovie1User2.userId]: ratingMovie1User2
        }
    });
});