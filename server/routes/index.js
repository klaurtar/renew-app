module.exports = api => {
    require('./itemPhotoOf')(api);
    require('./auth')(api);
    require('./items')(api);
    require('./groups')(api);
}
