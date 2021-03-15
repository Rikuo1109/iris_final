// import { API_CONST } from './APIs';
// import fetch from 'cross-fetch';

const cats = [
    {
        label: 'Thể loại 1',
        url: '/the-loai-1',
        children: [
            {
                label: 'Con thể loại 1 - 1',
                url: '/con-the-loai-11',
            },
            {
                label: 'Con thể loại 1 - 2',
                url: '/con-the-loai-12',
            }
        ],
    },
    {
        label: 'Thể loại 2',
        url: '/the-loai-2',
    },
    {
        label: 'Thể loại 3',
        url: '/the-loai-3',
        children: [
            {
                label: 'Con thể loại 3 - 1',
                url: '/con-the-loai-31',
            },
            {
                label: 'Con thể loại 3 - 2',
                url: '/con-the-loai-32',
            }
        ],
    },
    {
        label: 'Thể loại 4',
        url: '/the-loai-4',
    },
    {
        label: 'Thể loại 5',
        url: '/the-loai-5',
        children: [
            {
                label: 'Con thể loại 5 - 1',
                url: '/con-the-loai-51',
            },
            {
                label: 'Con thể loại 5 - 2',
                url: '/con-the-loai-52',
            }
        ],
    },
    {
        label: 'Thể loại 6',
        url: '/the-loai-6',
    },
]
const getCategories = async () => {
    return cats
    // let response;
    // let options = {
    //     method: 'GET',
    // }
    // let url = API_CONST.GET_CATEGORRIES;
    // //tokenUtil.updateOrCreateHeader(options);
    // try {
    //     response = await fetch(url, options);
    //     let body = await response.json();
    //     //tokenUtil.checkResponseErrorCode(body, options.method);
    //     return [body.error_code === 0, body];
    // }
    // catch (e) {
    //     if (response && response.statusText) {
    //         return [false, response.statusText];
    //     } else {
    //         return [false, e.message];
    //     }
    // }
}

const bookDetails = {
    uid: 'defautId',
    name: 'Tên sách',
    rate_average: 4,
    rate_count: 1234,
    price: 12400,
    discount: '-12%',
    author: 'Tác giả',
    numpage: 12,
    bookCover: 'Bìa mềm',
    publisher: 'NXB Kim Đồng',
    ctyph: 'Skybooks',
    images: [
        'https://salt.tikicdn.com/cache/w80/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        'https://vcdn.tikicdn.com/cache/w80/ts/review/da/b3/1e/76a4d4ff4788418e60ca9b8054cfbfe9.jpg',
        'https://vcdn.tikicdn.com/cache/w80/ts/review/3b/d9/61/5cfb01575d11ee151f41d56fc7393235.jpg',
        'https://vcdn.tikicdn.com/cache/w80/ts/review/d1/da/ec/31d209a460d90b670fa553a3e4eccb57.jpg',
        'https://vcdn.tikicdn.com/cache/w80/ts/review/78/31/58/5f8e4187132f7c423cc8a0027c7db26d.jpg',
        'https://vcdn.tikicdn.com/cache/w80/ts/review/b7/ae/39/f72d4fce28f260fb083e467a2742f889.jpg']
}
const getBookDetails = (bookId) => {
    return bookDetails
}

const relaPros = [
    {
        image: 'https://salt.tikicdn.com/cache/w80/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID1',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
    {
        image: 'https://salt.tikicdn.com/cache/w80/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID2',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
    {
        image: 'https://salt.tikicdn.com/cache/w80/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID3',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
    {
        image: 'https://salt.tikicdn.com/cache/w80/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID4',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
    {
        image: 'https://salt.tikicdn.com/cache/w80/ts/product/d6/bc/b7/563e47aefa07f6c79ec05b68240d4d44.jpg',
        name: 'Tên sách',
        uid: 'bookID5',
        rate_average: 4,
        rate_count: 125,
        price: 13000,
        discount: '-15%',
    },
]
const getRelatedProducts = bookId => {
    return relaPros
}
const des = 'Để hoàn thành nhiệm vụ gìn giữ hòa bình cho hai nước Ostania và Westalis, gia đình Forger đã vượt qua kì thi tuyển đầy thử thách của học viện danh tiếng. Nhưng sau đó Anya phải trở thành học sinh ưu tú của trường để tiếp cận Desmond. Kế hoạch tác chiến “xây dựng tình bạn” của Twilight sẽ được thực hiện thế nào đây…!?<br /><br />TATSUYA ENDO<br /><br />Có một thuyết cho rằng gián điệp là nghề nghiệp cổ xưa thứ 2 trên thế giới. Lừa lọc, đánh bẫy, đó chính là lịch sử dối trá của nhân loại.<br />Ngay cả tôi, ngày nào cũng đưa cho biên tập viên thông tin sai lệch rằng: “Trong hôm nay tôi sẽ nộp bản thảo!” đấy.<br /><p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Tuy nhiên tuỳ vào từng loại sản phẩm hoặc phương thức, địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, ...</p>'
const getBookDescription = bookId => {
    return des
}
const getRecomendedProducts = (userID, category) => relaPros.slice(0, 4)

const rates = [
    {
        numRate: 4,
        content: 'Đây là nội dung bình luận',
        user: 'Người dùng',
        time: '21/01/2021',
    }
]
const getRate = bookID => rates
export const ProductServices = {
    getCategories,
    getBookDetails,
    getRelatedProducts,
    getRecomendedProducts,
    getBookDescription,
    getRate,
}