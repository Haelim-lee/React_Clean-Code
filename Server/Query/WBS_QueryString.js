module.exports ={
  
    // 프로그래밍 댓글 삭제
    handleSelectToDoWBS : `
    SELECT WBS_TODO_TITLE,WBS_TODO_SUBJECT FROM WBS_TODO_LIST
    `,
    // 프로그래밍 댓글 삭제
    handleInsertToDoWBS : `
    INSERT INTO WBS_TODO_LIST(WBS_NO,WBS_TODO_TITLE,WBS_TODO_SUBJECT)
    VALUES ((SELECT SKYNET.NEXTVAL('WBS') FROM DUAL),?,?) 
    `,
  }