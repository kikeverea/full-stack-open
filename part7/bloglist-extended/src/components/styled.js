import styled from 'styled-components'

export const TableColumn = styled.td`
    padding: 10px;
  `

export const TableHeader = styled.th`
    padding: 10px 20px 10px 20px;
  `

export const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
  `

export const FlexSpacedRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 18px 10px 18px;
  `

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `

export const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid black;
  padding: 10px 16px 10px 16px;
  `