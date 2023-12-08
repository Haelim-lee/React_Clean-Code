module.exports ={

    //#region 인프라 SQL 목록
    
    // 인프라 게시글 목록 (Home 화면 전용)
    handleSelectInfraBoard : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_Infra
    ORDER BY NUM DESC LIMIT 6
    `,

    // 인프라 게시글 목록 (진짜 게시글 목록)
    handleSelectInfraBoard_ORG : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_Infra
    ORDER BY NUM DESC
    `,
    //인프라 카테고리
    handleInfraCategoryList : `
    SELECT distinct NOTICE_CATEGORY
    FROM skynet.workroom_infra
    `,

    // 인프라 페이지 게시글 목록
    handleSelectInfraBoardPage : `
    SELECT PAGELIST.ROWNUM
          ,PAGELIST.NUM 
          ,PAGELIST.NOTICE_NAME
          ,PAGELIST.NOTICE_CATEGORY
          ,PAGELIST.NOTICE_TITLE
          ,PAGELIST.NOTICE_CONTENTS
          ,PAGELIST.SEARCH_COUNT
          ,PAGELIST.PUBLIC
    FROM (SELECT ROW_NUMBER() OVER ( ORDER BY NUM DESC) as ROWNUM
              , NUM
              , NOTICE_NAME
              , NOTICE_CATEGORY
              , NOTICE_TITLE
              , NOTICE_CONTENTS
              , SEARCH_COUNT
              , PUBLIC
          FROM SKYNET.WORKROOM_Infra BOARD
          WHERE notice_Category = ?
          ) PAGELIST
          WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,
    
    // 인프라 페이지 목록
    handleSelectInfraBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
    , IF(MOD(TOTAL.TOTALITEM,10)=0 , (TOTAL.TOTALITEM DIV 10) - 1,TOTAL.TOTALITEM DIV 10) as TOTALPAGE FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) as TOTALITEM FROM (SELECT NOTICE_CATEGORY FROM SKYNET.WORKROOM_infra WHERE NOTICE_CATEGORY=?) BOARD , (SELECT @ROWNUM:=0) ROWNUM) TOTAL
    `,

    // 인프라 게시글 추가
    handleInsertInfraBoard : `
    INSERT INTO WORKROOM_Infra
    (
      NUM
    , NOTICE_ID
    , NOTICE_NAME
    , NOTICE_TITLE
    , NOTICE_CONTENTS
    , NOTICE_CATEGORY
    , Public
    )
    VALUES
    (
      (SELECT SKYNET.NEXTVAL('BORD') FROM DUAL)
    , ?
    , ?
    , ?
    , ?
    , ?
    , ?
    )`,

    // 인프라 게시글 삭제
    handleDeleteInfraBoard : `
    DELETE FROM WORKROOM_Infra
    WHERE NUM = ?
    `,
    
    // 인프라 게시글 수정
    handleUpdateInfraBoard : `
    UPDATE SKYNET.WORKROOM_Infra
    SET NOTICE_TITLE = ?
      , NOTICE_CONTENTS = ?
      , NOTICE_CATEGORY = ?
      , Public = ?
    WHERE NUM = ?
    `,

    // 인프라 게시글 내용 불러오기
    handleReadInfraBoard : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS
        , NOTICE_CATEGORY
        , SEARCH_COUNT
        , Public
    FROM WORKROOM_Infra
    WHERE NUM = ?
    `,

    // 인프라 게시글 조회수 증가
    handleInfraSearchCountPlus : `
    UPDATE WORKROOM_Infra
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,

    // 인프라 댓글 목록
    handleReadInfraComments : `
    SELECT CONTENTS
         , USER_ID
         , USER_NAME
         , COMMENT_NUM
         , NOTICE_NAME
         , NOTICE_NUM
         , PARENTS_COMMENT_NUM
         , MODIFY_FLAG
         , DATE_FORMAT(CREATE_TIME, '%Y-%m-%d %H:%i:%s') AS CREATE_TIME
    FROM SKYNET.NOTICE_COMMENT
    WHERE USE_FLAG = 'Y'
    AND NOTICE_NAME = 'WORKROOM_Infra'
    AND NOTICE_NUM = ?
    `,

    // 인프라 댓글 등록
    handleInsertInfraComment : `
    INSERT INTO SKYNET.NOTICE_COMMENT
    (
        COMMENT_NUM
      , PARENTS_COMMENT_NUM
      , NOTICE_NAME
      , NOTICE_NUM
      , USER_ID
      , USER_NAME
      , CONTENTS
    )
    VALUES
    (
        (SELECT SKYNET.NEXTVAL('COMMENT') FROM DUAL)
      , NULL
      , 'WORKROOM_Infra'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 인프라 댓글 삭제
    handleDeleteInfraComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,
    
    //#endregion 인프라 SQL 목록
}