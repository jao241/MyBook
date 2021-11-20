import styled from 'styled-components/native';

export const Avatar = styled.Image`
    padding: 4px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
`;

export const NomeEmpresa = styled.Text`
    padding: 8px;
    font-size: 16px;
    color: #59594a;
`;

export const NomeProduto = styled.Text`
    padding: 8px;
    font-size: 16px;
    color: #59594a;
`;

export const DescricaoProduto = styled.Text`
    font-size: 14px;
    color: #59594a;
`;

export const PrecoProduto = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #59594a;
`;

export const Likes = styled.Text`
    font-size: 14px;
    color: #59594a;
    padding-left: 5px;
`;

export const EntradaNomeProduto = styled.TextInput`
    height: 35px;
    width: 100%;
    background-color: #fff;
    border-color: #c7c7c7;
    border-width: 1px;
    border-radius: 8px;
    padding: 10px;
    margin: 0 10px;
`;

export const CaixaLupa = styled.Text`
    background-color: grey;        
    border-radius: 10px;
    padding: 5px;    
`;

export const CentralizarItens = styled.View`
    flexDirection: row;
    justify-content: center;
    align-items: center;
`;

export const HeaderText = styled.Text`
    color: #fff;
`;

export const NovoComentario = styled.View`
    margin-top: 300px;
    align-self: center;
    width: 80%;
`;
