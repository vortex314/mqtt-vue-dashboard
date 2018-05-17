export default class Topic {
  static getDevice(topic){
    return topic.split('/')[1]
  }
  static getService(topic){
    return topic.split('/')[2]
  }
  static getProperty(topic){
    return topic.split('/')[3]
  }
  static isSrc(topic){
    return topic.split('/')[0]=="src"
  }
  static isDst(topic){
    return topic.split('/')[0]=="dst"
  }
}
