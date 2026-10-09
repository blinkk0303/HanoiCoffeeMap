// middleware xử lý lỗi tập trung


function errorHandler(err,req,res,next){
    const statusCode = err.statusCode || 500;
    // const isProduction = process.env.NODE_ENV === 'production';

    //log lỗi ở server (luon log, ke ca production de debug)
    console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`);
    // Log đầy đủ ở server: có stack trace chỉ ra file và dòng gây lỗi
    console.error(`[${req.method} ${req.originalUrl}]`, err.name, err.code, '\n', err.stack)

    //loi 'biet truoc' (validate , not found, unauthorized,...) - tra message ro rang 
    if(err.isOperational){
        return res.status(statusCode).json({success: false,message: err.message});
    }

    // loi khong luong truoc (db crash, bug,...) - khong lo chi tiet ra production
    res.status(500).json({
    success: false,
    error: err.code || err.name,
    // message: isProduction ? 'Đã xảy ra lỗi, vui lòng thử lại sau' : err.message,
    // ...(isProduction ? {} : { stack: err.stack })
    message: err.message,
    ...({ stack: err.stack })
  });
}

export default errorHandler;