struct coefficients{
  double a,// constant
    b,// * x
    c,// * x^2
    d;// * x^3
};
typedef struct coefficients coefs;
class node{
  double x, y;
public:
  void setx(double);
  void sety(double);
  double getx();
  double gety();
  double distance_from_point(double, double);
  double distance_from_line(double, double, double, double);
  double distance_from_spline(double, double, double, double, double, double, double, double);
  bool triangle_test(double, double, double, double, double, double);
}
class segment{
  double linear_length, spline_length;
  bool linear_length_is_valid, spline_length_is_valid;
  coefs coefsx, coefsy;
  node snode, *enode;
  void calc_coefs(node, node, node);
  void calc_linear_length();
  void calc_spline_length();
public:
  segment();
  void set_node(node);
  node get_node();
  double get_linear_length();
  double get_spline_length();
  coefs get_xcoefs();
  coefs get_ycoefs();
};
class road{
  string id;
  vector<segment> segments;
  double linear_length, spline_length;
  bool linear_length_is_valid, spline_length_is_valid;
  void calc_linear_length();
  void calc_spline_length();
public:
  void add_segment(segment);
  void add_segments(vector<segment>);
  void merge_road(road);
  double get_linear_length();
  double get_spline_length();
  string get_id();
  void set_id();
};
class region{
  string id;
  vector <road> roads;
  double avg_road_length, total_road_length;
  bool avg_road_length_is_valid, total_road_length_is_valid;
  void calc_total_road_length();
  void calc_avg_road_length();
public:
  void import_file(string);
  void export_file(string);
  void import_URL(string);
  void add_road(road);
  void add_roads(vector<road>);
  void merge_region(region);
  void merge_file(string);
  void merge_URL(string);
  double get_total_road_length();
  double get_road_length(int);
  double get_average_road_length();
  string get_id();
  void set_id();
};
class route{
  string id;
  vector <road> roads;
  double avg_road_length, total_road_length;
  bool avg_road_length_is_valid, total_road_length_is_valid;
  void calc_total_road_length();
  void calc_avg_road_length();
public:
  void merge_all();
};
