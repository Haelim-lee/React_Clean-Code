module.exports ={
    
  //#region 프로그래밍 SQL 목록
  
  // 프로그래밍 게시글 목록 (Home 화면 전용)
  handleSelectQAQABoard : `
  SELECT NUM
       , NOTICE_NAME
       , NOTICE_TITLE
  FROM SKYNET.QA_QA
  ORDER BY NUM DESC LIMIT 6
  `,

  // 프로그래밍 게시글 목록 (진짜 게시글 목록)
  handleSelectQAQABoard_ORG : `
  SELECT NUM
       , NOTICE_NAME
       , NOTICE_TITLE
  FROM SKYNET.QA_QA
  ORDER BY NUM DESC
  `,

  // 프로그래밍 페이지 게시글 목록
  handleSelectQAQABoardPage : `
  SELECT PAGELIST.ROWNUM
        ,PAGELIST.NUM 
        ,PAGELIST.NOTICE_NAME
        ,PAGELIST.NOTICE_TITLE
        ,PAGELIST.NOTICE_CONTENTS
        ,PAGELIST.SEARCH_COUNT
  FROM (SELECT @ROWNUM:=@ROWNUM +1 AS ROWNUM
             , NUM
             , NOTICE_NAME
             , NOTICE_TITLE
             , NOTICE_CONTENTS
             , SEARCH_COUNT
        FROM SKYNET.QA_QA BOARD
           , (SELECT @ROWNUM:=0) ROWNUM ORDER BY NUM DESC) PAGELIST
        WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
  `,
  
  // 프로그래밍 페이지 목록
  handleSelectQAQABoardPageList : `
  SELECT TOTAL.TOTALITEM AS ITEMCOUNT
      , IF(MOD(TOTAL.TOTALITEM,10)=0 
      , (TOTAL.TOTALITEM DIV 10) - 1,TOTAL.TOTALITEM DIV 10) as TOTALPAGE
  FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) as TOTALITEM
      FROM SKYNET.QA_QA BOARD
          , (SELECT @ROWNUM:=0) ROWNUM
      ) TOTAL
  `,

  // 프로그래밍 게시글 추가
  handleInsertQAQABoard : `
  INSERT INTO QA_QA
  (
    NUM
  , NOTICE_ID
  , NOTICE_NAME
  , NOTICE_TITLE
  , NOTICE_CONTENTS
  )
  VALUES
  (
    (SELECT SKYNET.NEXTVAL('BORD') FROM DUAL)
  , ?
  , ?
  , ?
  , ?
  )`,

  // 프로그래밍 게시글 삭제
  handleDeleteQAQABoard : `
  DELETE FROM QA_QA
  WHERE NUM = ?
  `,
  
  // 프로그래밍 게시글 수정
  handleUpdateQAQABoard : `
  UPDATE SKYNET.QA_QA
  SET NOTICE_TITLE = ?
    , NOTICE_CONTENTS = ?
  WHERE NUM = ?
  `,

  // 프로그래밍 게시글 내용 불러오기
  handleReadQAQABoard : `
  SELECT NUM
      , NOTICE_NAME
      , NOTICE_TITLE
      , NOTICE_CONTENTS
      , SEARCH_COUNT
  FROM QA_QA
  WHERE NUM = ?
  `,

  // 프로그래밍 게시글 조회수 증가
  handleQAQASearchCountPlus : `
  UPDATE QA_QA
  SET SEARCH_COUNT = SEARCH_COUNT + 1
  WHERE NUM = ?
  `,

  // 프로그래밍 댓글 목록
  handleReadQAQAComments : `
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
  AND NOTICE_NAME = 'QA_QA'
  AND NOTICE_NUM = ?
  `,

  // 프로그래밍 댓글 등록
  handleInsertQAQAComment : `
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
    , 'QA_QA'
    , ?
    , ?
    , ?
    , ?
  )
  `,
  
  // 프로그래밍 댓글 삭제
  handleDeleteQAQAComment : `
  UPDATE SKYNET.NOTICE_COMMENT
  SET USE_FLAG = 'N'
  WHERE COMMENT_NUM = ? 
  `,
  
  //#endregion 프로그래밍 SQL 목록
}