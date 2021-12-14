import React from 'react'
import { Footer2 } from './StylesFooter'
import { Language } from './StylesFooter'
import { Footer1 } from './StylesFooter'
import { FooterWrapped } from './StylesFooter'

export default function Footer() {
    return (
        <FooterWrapped>
            <div className="container">
                <Footer1>
                    <div>© 2021 Shopee. Tất cả các quyền được bảo lưu.</div>
                    <Language>
                        <span>Tiếng Anh</span>
                        <span>Tiếng Việt</span>
                    </Language>
                </Footer1>
                <Footer2>
                    <div>Công Ty TNHH Shopee</div>
                    <div>
                        Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba
                        Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
                    </div>
                    <div>
                        Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
                    </div>
                    <div>
                        Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
                    </div>
                    <div>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
                </Footer2>
            </div>
        </FooterWrapped>
    )
}
