module.exports ={
    
    //#region 디자인 SQL 목록
    
    // 디자인 게시글 목록 (Home 화면 전용)
    handleSelectDesignBoard : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_Design
    ORDER BY NUM DESC LIMIT 6
    `,

    // 디자인 게시글 목록 (진짜 게시글 목록)
    handleSelectDesignBoard_ORG : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_Design
    ORDER BY NUM DESC
    `,

    // 디자인 페이지 게시글 목록
    handleDesignCategoryList : `
    SELECT distinct NOTICE_CATEGORY
    FROM SKYNET.WORKROOM_Design
    `,

    // 디자인 페이지 게시글 목록
    handleSelectDesignBoardPage : `
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
          FROM SKYNET.WORKROOM_Design BOARD
          WHERE notice_Category = ?
          ) PAGELIST
          WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,
    
    // 디자인 페이지 목록
    handleSelectDesignBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
    , IF(MOD(TOTAL.TOTALITEM,10)=0 , (TOTAL.TOTALITEM DIV 10) - 1,TOTAL.TOTALITEM DIV 10) as TOTALPAGE FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) as TOTALITEM FROM (SELECT NOTICE_CATEGORY FROM SKYNET.WORKROOM_Design WHERE NOTICE_CATEGORY=?) BOARD , (SELECT @ROWNUM:=0) ROWNUM) TOTAL
    `,

    // 디자인 게시글 추가
    handleInsertDesignBoard : `
    INSERT INTO WORKROOM_Design
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

    // 디자인 게시글 삭제
    handleDeleteDesignBoard : `
    DELETE FROM WORKROOM_Design
    WHERE NUM = ?
    `,
    
    // 디자인 게시글 수정
    handleUpdateDesignBoard : `
    UPDATE SKYNET.WORKROOM_Design
    SET NOTICE_TITLE = ?
      , NOTICE_CONTENTS = ?
      , NOTICE_CATEGORY = ?
      , Public = ?
    WHERE NUM = ?
    `,

    // 디자인 게시글 내용 불러오기
    handleReadDesignBoard : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS
        , NOTICE_CATEGORY
        , SEARCH_COUNT
        , Public
    FROM WORKROOM_Design
    WHERE NUM = ?
    `,

    // 디자인 게시글 조회수 증가
    handleDesignSearchCountPlus : `
    UPDATE WORKROOM_Design
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,

    // 디자인 댓글 목록
    handleReadDesignComments : `
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
    AND NOTICE_NAME = 'WORKROOM_Design'
    AND NOTICE_NUM = ?
    `,

    // 디자인 댓글 등록
    handleInsertDesignComment : `
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
      , 'WORKROOM_Design'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 디자인 댓글 삭제
    handleDeleteDesignComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,
    
    //#endregion 디자인 SQL 목록
}