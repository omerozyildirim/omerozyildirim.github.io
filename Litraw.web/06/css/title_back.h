/*  GIMP header image file format (RGB): /home/omero/Documents/Litraw/zia/4/css/title_back.h  */

static unsigned int width = 1;
static unsigned int height = 96;

/*  Call this macro repeatedly.  After each use, the pixel data can be extracted  */

#define HEADER_PIXEL(data,pixel) {\
pixel[0] = (((data[0] - 33) << 2) | ((data[1] - 33) >> 4)); \
pixel[1] = ((((data[1] - 33) & 0xF) << 4) | ((data[2] - 33) >> 2)); \
pixel[2] = ((((data[2] - 33) & 0x3) << 6) | ((data[3] - 33))); \
data += 4; \
}
static char *header_data =
	"````````````````````````````````````````````````````````````````"
	"````````````````````````````````````````````````````````````````"
	"````````````````````````````````````````````````````````````````"
	"````````````````````````````````````````````````````````````````"
	"````````^`@X\\_`PZO<GX>X>VN<7T=X.R-4%P<W^N,3UK[OLI[/DGZO<EZ/4CYO,"
	"AI+#?8FZ=8&R;7FJ97&B76F:5&\"13%B)1%\"!.T=X,S]P*C9G(R]@&B97$AY/\"A9'"
	"";
