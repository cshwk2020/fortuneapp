

export default class FortuneConstants {

  //
  static NAME_CYLINDER = "CYLINDER";
  static NAME_PAPER = "PAPER";

    //
    static EVENT_MISC_HIT_CYLINDER = "EVENT_MISC_HIT_CYLINDER";

    // 
    static CYLINDER_VIBRATE_DURATION = 0.1;
    static PAPER_UP_DURATION = 0.5;
     
    //
    static slot_size_multiplier = 6;
    static slot_w = 0.045 * FortuneConstants.slot_size_multiplier;
    static slot_h = 0.08  * FortuneConstants.slot_size_multiplier;
    static slot_l = 0.01  * FortuneConstants.slot_size_multiplier;
    static slot_thickness = 0.01 * FortuneConstants.slot_size_multiplier;

    //
    static paper_size_scale = 0.6;
    static zero_thickness = 0.001;

     

    /*
    static paper_w = 0.04 * FortuneConstants.paper_size_multiplier;
    static paper_h = 0.08 * FortuneConstants.paper_size_multiplier;
    static paper_thickness = 0.01 
    */

    //
    static r = 0.2;
    static cylinder_h = 0.5;
    static bottom_h = 0.01
   
    //
    static stick_w = 0.02;
    static stick_h = 0.6;
    static bounded_h_adjust = ((FortuneConstants.stick_h - FortuneConstants.cylinder_h) / 2);

    //
    static specialStick_min_y = FortuneConstants.bounded_h_adjust;
    static specialStick_max_y = FortuneConstants.bounded_h_adjust + 0.6;


    //
    static getRandomNumFromRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      //
  static FIRE_VIBRATE_DURATION = 2;
  static fire_size_multiplier = 3;
  static fire_w = 0.045 * FortuneConstants.fire_size_multiplier;
  static fire_h = 0.08  * FortuneConstants.fire_size_multiplier;
  static fire_l = 0.01  * FortuneConstants.fire_size_multiplier;
 
  static cradle_middle_multiplier = 0.6;
  static cradle_middle_height = 1 * FortuneConstants.cradle_middle_multiplier;
  static cradle_middle_radius = 0.1 * FortuneConstants.cradle_middle_multiplier;

  static cradle_lower_multiplier = 0.4;
  static cradle_lower_height = 4 * FortuneConstants.cradle_lower_multiplier;
  static cradle_lower_radius = 0.06 * FortuneConstants.cradle_lower_multiplier;

  static cradle_base_multiplier = 5;
  static cradle_base_w = 0.4 * FortuneConstants.cradle_base_multiplier;
  static cradle_base_h = 0.15 * FortuneConstants.cradle_base_multiplier;
  static cradle_base_l = 0.1 * FortuneConstants.cradle_base_multiplier;


  static getResourceBase() {
    //return "http://localhost:3000";
    return ".";
  }

  static getImgResourceBase() {
    return `${FortuneConstants.getResourceBase()}/img`;
  }
  static getSoundResourceBase() {
    return `${FortuneConstants.getResourceBase()}/sound`;
  }
  static getCylinderVibrateSound() {
    return `${FortuneConstants.getSoundResourceBase()}/minus.wav`;
  } 

  static getWoodTexture() {
    return `${FortuneConstants.getImgResourceBase()}/wood16.jpeg`;
  } 
  static getStickTexture() {
    return `${FortuneConstants.getImgResourceBase()}/wooden_hint2.jpg`;
  } 
  static getSpecialStickTexture() {
    return `${FortuneConstants.getImgResourceBase()}/wooden_hint2.jpg`;
  } 
  static getStatueTexture() {
    return `${FortuneConstants.getImgResourceBase()}/luckdrawstatue.png`;
  } 
  static getSlotTexture() {
    return `${FortuneConstants.getImgResourceBase()}/wood14.jpeg`;
  } 
  static getFireTexture() {
    return `${FortuneConstants.getImgResourceBase()}/fire.png`;
  } 
  static getCylinderTexture() {
    return `${FortuneConstants.getImgResourceBase()}/wood16.jpeg`;
  } 
  static getCradleBaseFrontTexture() {
    return `${FortuneConstants.getImgResourceBase()}/cradle_base_front.jpg`;
  } 
  static getCradleBaseSideTexture() {
    return `${FortuneConstants.getImgResourceBase()}/cradle_base_side.jpg`;
  } 
  static getCradleTexture() {
    return `${FortuneConstants.getImgResourceBase()}/cradle.jpg`;
  } 
  static getCradleStickTexture() {
    return `${FortuneConstants.getImgResourceBase()}/cradle_stick.jpg`;
  } 

  static getSmokeTexture() {
    return `${FortuneConstants.getImgResourceBase()}/smoke4.png`;
  } 


  static getPaperTexture(paperNum) {
    return `${FortuneConstants.getResourceBase()}/1_100/p${paperNum}.jpg`;
  } 
 
 
}