import request from '@/utils/request'

export function getCardInfo() {
  return request({
    url: '/func/web/getCardInfo',
    method: 'post'
  })
}
export function saveCard(cardId, cardNum, cardType, cardStatus, companyId, personId) {
  return request({
    url: '/func/web/saveCardList',
    method: 'POST',
    data: {
      cardId,
      cardNum,
      cardType,
      cardStatus,
      companyId,
      personId
    }
  })
}
export function editCard(cardId, cardNum, cardType, cardStatus, companyId, personId) {
  return request({
    url: '/func/web/editCardList',
    method: 'POST',
    data: {
      cardId,
      cardNum,
      cardType,
      cardStatus,
      companyId,
      personId
    }
  })
}
export function deleteCard(cardId) {
  return request({
    url: '/func/web/deleteCardList',
    method: 'POST',
    data: {
      cardId
    }
  })
}

