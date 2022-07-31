import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import TerrainIcon from '@mui/icons-material/Terrain';
import TagIcon from '@mui/icons-material/Tag';

const MountainIndex = ({initTab}) => {
  const provideProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };
  const [tab, setTab] = React.useState(initTab);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ minHeight: '100%', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ py: 5 }} >
        <Paper elevation={3} >
          <Box sx={{ borderRadius: '4px 4px 0 0', borderBottom: 1, borderColor: 'divider', width: '100%', position: 'sticky', top: 0, zIndex: '100', backgroundColor: '#fff' }}>
            <Tabs value={tab} onChange={handleChangeTab} variant="fullWidth" aria-label="basic tabs example">
              <Tab icon={<SearchIcon />} label="フリーワード検索" {...provideProps(0)} />
              <Tab icon={<PublicIcon />} label="都道府県から探す" {...provideProps(1)} />
              <Tab icon={<TerrainIcon />} label="山域から探す" {...provideProps(2)} />
              <Tab icon={<TagIcon />} label="タグから探す" {...provideProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0} style={{ height: '100%', padding: '24px' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>フリーワードで探す</Typography>
            <form action="" method="post">
              <TextField fullWidth label="フリーワード検索" type="text" placeholder="山の名前、キーワード などを入力" variant="outlined" margin="normal" />
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Button type="submit" variant="contained" sx={{ minWidth: '200px'}}>検索</Button>
              </Box>
            </form>
          </TabPanel>
          <TabPanel value={tab} index={1} style={{ height: '100%', padding: '24px' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>都道府県から探す</Typography>
            <Box>
              <Box><Button href="/mountains/regions/1" size="large">北海道地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/1">北海道</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/2" size="large">東北地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/2">青森</Button>
                <Button href="/mountains/prefectures/3">岩手</Button>
                <Button href="/mountains/prefectures/4">宮城</Button>
                <Button href="/mountains/prefectures/5">秋田</Button>
                <Button href="/mountains/prefectures/6">山形</Button>
                <Button href="/mountains/prefectures/7">福島</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/3" size="large">関東地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/8">茨城</Button>
                <Button href="/mountains/prefectures/9">栃木</Button>
                <Button href="/mountains/prefectures/10">群馬</Button>
                <Button href="/mountains/prefectures/11">埼玉</Button>
                <Button href="/mountains/prefectures/12">千葉</Button>
                <Button href="/mountains/prefectures/13">東京</Button>
                <Button href="/mountains/prefectures/14">神奈川</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/4" size="large">甲信越地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/15">新潟</Button>
                <Button href="/mountains/prefectures/16">山梨</Button>
                <Button href="/mountains/prefectures/17">長野</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/5" size="large">東海地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/18">岐阜</Button>
                <Button href="/mountains/prefectures/19">静岡</Button>
                <Button href="/mountains/prefectures/20">愛知</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/6" size="large">北陸地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/21">富山</Button>
                <Button href="/mountains/prefectures/22">石川</Button>
                <Button href="/mountains/prefectures/23">福井</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/7" size="large">近畿地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/24">三重</Button>
                <Button href="/mountains/prefectures/25">滋賀</Button>
                <Button href="/mountains/prefectures/26">京都</Button>
                <Button href="/mountains/prefectures/27">大阪</Button>
                <Button href="/mountains/prefectures/28">兵庫</Button>
                <Button href="/mountains/prefectures/29">奈良</Button>
                <Button href="/mountains/prefectures/30">和歌山</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/8" size="large">中国地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/31">鳥取</Button>
                <Button href="/mountains/prefectures/32">島根</Button>
                <Button href="/mountains/prefectures/33">岡山</Button>
                <Button href="/mountains/prefectures/34">広島</Button>
                <Button href="/mountains/prefectures/35">山口</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/9" size="large">四国地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/36">徳島</Button>
                <Button href="/mountains/prefectures/37">香川</Button>
                <Button href="/mountains/prefectures/38">愛媛</Button>
                <Button href="/mountains/prefectures/39">高知</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/10" size="large">九州地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/40">福岡</Button>
                <Button href="/mountains/prefectures/41">佐賀</Button>
                <Button href="/mountains/prefectures/42">長崎</Button>
                <Button href="/mountains/prefectures/43">熊本</Button>
                <Button href="/mountains/prefectures/44">大分</Button>
                <Button href="/mountains/prefectures/45">宮崎</Button>
                <Button href="/mountains/prefectures/46">鹿児島</Button>
              </Box>
              <Divider/>
              <Box><Button href="/mountains/regions/11" size="large">沖縄地方</Button></Box>
              <Box sx={{ pl: 2 }}>
                <Button href="/mountains/prefectures/47">沖縄</Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={2} style={{ height: '100%', padding: '24px' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>山域から探す</Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff'}} aria-controls="panel1-content" id="panel1-header">
                <Typography variant="body1">北海道</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/1">知床半島</Button>
                <Button href="/mountains/areas/2">石狩山地</Button>
                <Button href="/mountains/areas/3">大雪山系</Button>
                <Button href="/mountains/areas/4">十勝岳連峰</Button>
                <Button href="/mountains/areas/5">日高山脈</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel2-content" id="panel2-header">
                <Typography variant="body1">東北</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/6">奥羽山脈</Button>
                <Button href="/mountains/areas/7">北上山地</Button>
                <Button href="/mountains/areas/8">出羽山地</Button>
                <Button href="/mountains/areas/9">朝日連峰</Button>
                <Button href="/mountains/areas/10">飯豊山地</Button>
                <Button href="/mountains/areas/11">吾妻連峰</Button>
                <Button href="/mountains/areas/12">越後山脈</Button>
                <Button href="/mountains/areas/14">八溝山地</Button>
                <Button href="/mountains/areas/15">尾瀬</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel3-content" id="panel3-header">
                <Typography variant="body1">関東</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/12">越後山脈</Button>
                <Button href="/mountains/areas/13">那須連山</Button>
                <Button href="/mountains/areas/14">八溝山地</Button>
                <Button href="/mountains/areas/15">尾瀬</Button>
                <Button href="/mountains/areas/16">日光連山</Button>
                <Button href="/mountains/areas/17">足尾山地</Button>
                <Button href="/mountains/areas/18">三国山脈</Button>
                <Button href="/mountains/areas/21">秩父山地</Button>
                <Button href="/mountains/areas/22">奥秩父山塊</Button>
                <Button href="/mountains/areas/23">丹沢山地</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel4-content" id="panel4-header">
                <Typography variant="body1">甲信越</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/10">飯豊山地</Button>
                <Button href="/mountains/areas/12">越後山脈</Button>
                <Button href="/mountains/areas/18">三国山脈</Button>
                <Button href="/mountains/areas/19">頸城山塊</Button>
                <Button href="/mountains/areas/20">戸隠連峰</Button>
                <Button href="/mountains/areas/21">秩父山地</Button>
                <Button href="/mountains/areas/22">奥秩父山塊</Button>
                <Button href="/mountains/areas/25">飛騨山脈(北アルプス)</Button>
                <Button href="/mountains/areas/26">後立山連峰</Button>
                <Button href="/mountains/areas/28">美ヶ原</Button>
                <Button href="/mountains/areas/29">霧ヶ峰</Button>
                <Button href="/mountains/areas/30">八ヶ岳連峰</Button>
                <Button href="/mountains/areas/31">木曽山脈(中央アルプス)</Button>
                <Button href="/mountains/areas/32">赤石山脈(南アルプス)</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel5-content" id="panel5-header">
                <Typography variant="body1">東海</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/24">伊豆半島</Button>
                <Button href="/mountains/areas/25">飛騨山脈(北アルプス)</Button>
                <Button href="/mountains/areas/27">立山連峰</Button>
                <Button href="/mountains/areas/31">木曽山脈(中央アルプス)</Button>
                <Button href="/mountains/areas/32">赤石山脈(南アルプス)</Button>
                <Button href="/mountains/areas/33">両白山地</Button>
                <Button href="/mountains/areas/34">越美山地</Button>
                <Button href="/mountains/areas/35">伊吹山地</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel6-content" id="panel6-header">
                <Typography variant="body1">北陸</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/25">飛騨山脈(北アルプス)</Button>
                <Button href="/mountains/areas/26">後立山連峰</Button>
                <Button href="/mountains/areas/27">立山連峰</Button>
                <Button href="/mountains/areas/33">両白山地</Button>
                <Button href="/mountains/areas/34">越美山地</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel7-content" id="panel7-header">
                <Typography variant="body1">近畿</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/35">伊吹山地</Button>
                <Button href="/mountains/areas/36">台高山脈</Button>
                <Button href="/mountains/areas/37">紀伊山地</Button>
                <Button href="/mountains/areas/38">大峰山脈</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel8-content" id="panel8-header">
                <Typography variant="body1">中国</Typography>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel9-content" id="panel9-header">
                <Typography variant="body1">四国</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/39">四国山地</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel10-content" id="panel10-header">
                <Typography variant="body1">九州</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button href="/mountains/areas/40">くじゅう連山</Button>
                <Button href="/mountains/areas/41">九州山地</Button>
                <Button href="/mountains/areas/42">阿蘇山</Button>
                <Button href="/mountains/areas/43">霧島連山</Button>
                <Button href="/mountains/areas/44">屋久島</Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f0f8ff' }} aria-controls="panel11-content" id="panel11-header">
                <Typography variant="body1">沖縄</Typography>
              </AccordionSummary>
              <AccordionDetails>
              </AccordionDetails>
            </Accordion>
          </TabPanel>
          <TabPanel value={tab} index={3} style={{ height: '100%', padding: '24px' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>タグから探す</Typography>
            <Button href="/mountains/tags/1" size="large" variant="outlined" sx={{ m: 1 }}>日本百名山</Button>
            <Button href="/mountains/tags/2" size="large" variant="outlined" sx={{ m: 1 }}>新日本百名山</Button>
            <Button href="/mountains/tags/3" size="large" variant="outlined" sx={{ m: 1 }}>花の百名山</Button>
            <Button href="/mountains/tags/4" size="large" variant="outlined" sx={{ m: 1 }}>新・花の百名山</Button>
            <Button href="/mountains/tags/5" size="large" variant="outlined" sx={{ m: 1 }}>都道府県最高峰</Button>
            <Button href="/mountains/tags/6" size="large" variant="outlined" sx={{ m: 1 }}>3000m峰</Button>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default MountainIndex
