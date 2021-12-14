import styled from 'styled-components'

export const FooterWrapped = styled.footer`
    width: 100%;
    min-width: max-content;
    background: #f5f5f5;
    color: rgba(0, 0, 0, 0.65);
    padding: 4.2rem 0 3.7rem;
    font-size: 1.4rem;
`
export const Language = styled.div`
    display: flex;
    span {
        padding: 0 0.3125rem;
        cursor: pointer;
        &::not(:last-child) {
            border-right: 1px solid rgba(0, 0, 0, 0.2);
        }
    }
`
export const Footer1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
`
export const Footer2 = styled.div`
    font-size: 1.2rem;
    text-align: center;
    div {
        line-height: 2;
        &::first-child {
            margin-left: 1.5rem;
        }
    }
`
